// This Controller's function is to Create/Retrieve/Update a Recipe

const Category = require("../../models/Category");
const Ingredient = require("../../models/Ingredient");
const Recipe = require("../../models/Recipe");

// ----------------------------------------------------------------

// Create a new Recipe
const createNewRecipes = async (newRecipesData) => {
  console.log("Creating new Category", newRecipesData);
  const newRecipes = await Recipe.create(newRecipesData);
  return newRecipes;
};


exports.createRecipesController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    req.body.creator = req.user.id; // Add the logged in user's ID as creator
    const ingredientIds = [];
    req.body.ingredients.forEach(async (ingredient) => {
      const foundIngredient= await Ingredient.findOne({ name: ingredient });
      if (foundIngredient) {
        ingredientIds.push(foundIngredient._id);
      } else {
        const newOne = await Ingredient.create({ name: ingredient });
        ingredientIds.push(newOne._id);
      }
    });

    const newRecipes = createNewRecipes({
      ...req.body,
      ingredients: ingredientIds,
    });

    await Category.findByIdAndUpdate(req.body.category, {
      $push: { recipes: newRecipes._id },
    });


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
    const recipes = await Recipe.find()
      .populate("category")
      .populate("ingredient");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Retrieve Recipe by ID
exports.RecipesDetailsController = async (req, res) => {
  const { RecipesId } = req.params;
  const recipes = await Recipe.findById(RecipesId)
    .populate("category")
    .populate("ingredient");
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

    const ingredientIds = [];

    req.body.ingredient.forEach(async (element) => {
      const foundIngredient = await Ingredient.findOne({ name: element });
      if (foundIngredient) {
        // if (foundIngredient.recipe.includes(RecipesId)) {

        ingredientIds.push(foundIngredient._id);
        await foundIngredient.updateOne({ $push: { recipe: RecipesId } });
        // }
      } else {
        const newOne = Ingredient({
          name: element,
          recipe: [RecipesId],
        });
        const savedIngredient= await newOne.save();
        ingredientIds.push(savedIngredient._id);
      }
      return;
    });

    const foundRecipes = await Recipe.findById(RecipesId);

    if (foundRecipes) {
      await foundRecipes.updateOne({
        ...req.body,
        ingredient: ingredientIds,
      });

      res.status(200).json({ ingredientIds });
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
