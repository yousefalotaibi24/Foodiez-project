// This Controller's function is to Create/Retrieve/Update a Recipie

const Recipe = require("../../models/Recipe");

// ----------------------------------------------------------------

// Create a new Recipe
const creatNewRecipes = async (newRecipesData) => {
  console.log("Creating new Category", newRecipesData);
  const newRecipes = await Recipe.create(newRecipesData);
  return newRecipes;
};

exports.creatRecipesController = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newRecipes = creatNewRecipes(req.body);
    res.status(201).json(newRecipes);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

exports.addIngredients = async (req, res, next) => {
  try {
    const { ingredientId } = req.params;
    await Course.findByIdAndUpdate(req.course.id, {
      $push: { students: ingredientId },
    });
    await Student.findByIdAndUpdate(ingredientId, {
      $push: { courses: req.course.id },
    });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------

// Retrieve all Recipes
exports.listRecipesController = async (req, res) => {
  try {
    const recipess = await Recipe.find();
    res.status(200).json(recipess);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Retrieve Recipe by ID
exports.RecipesDetailsController = async (req, res) => {
  const { RecipesId } = req.params;
  const recipes = await Recipe.findById(RecipesId);
  if (recipes) {
    res.status(200).json(recipes);
  } else {
    res.status(404).json("Recipe ID not found");
  }
};

// ----------------------------------------------------------------

// Update Recipe by ID
exports.updateRecipesByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);
    if (foundRecipes) {
      await foundRecipes.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("Recipe ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------

// Delete Recipe by ID
exports.deleteRecipesIdController = async (req, res) => {
  try {
    const { RecipesId } = req.params;
    const foundRecipes = await Recipe.findById(RecipesId);
    if (foundRecipes) {
      await foundRecipes.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("Recipe ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
