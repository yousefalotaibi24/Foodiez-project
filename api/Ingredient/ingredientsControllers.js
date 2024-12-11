// This Controller's function is to Create/Retrieve/Update an Ingredient

const Ingredient = require("../../models/Ingredient");

// ----------------------------------------------------------------

// Create a new Ingredient

exports.createIngredientController = async (req, res) => {
  const ingredient = new Ingredient(req.body);
  const newIngredient = await ingredient.save();
  res.status(201).json(newIngredient);
};

// ----------------------------------------------------------------

// Retrieve all Ingredients

exports.listIngredientsController = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----------------------------------------------------------------

// Retrieve an Ingredient by ID

exports.ingredientDetailIdController = async (req, res) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findById(ingredientId);
  if (ingredient) {
    res.status(200).json(ingredient);
  } else {
    res.status(404).json();
  }
};

// Retrieve an Ingredient by Name

exports.ingredientDetailNameController = (req, res) => {
  const { ingredientName } = req.params;
  const name = Ingredients.find(
    (name) => name.ingredientName.toLowerCase() === ingredientName.toLowerCase()
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
};

// ----------------------------------------------------------------

// Update an Ingredient by ID

exports.updateIngredientByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { ingredientId } = req.params;
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------

// Delete an Ingredient by ID

exports.deleteIngredientIdController = async (req, res) => {
  try {
    const { ingredientId } = req.params;
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

//END of Controller
