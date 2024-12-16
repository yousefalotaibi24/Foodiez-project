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

// Retrieve an Ingredient by ID
exports.ingredientDetailIdController = async (req, res) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredient.findById(ingredientId);
  if (ingredient) {
    res.status(200).json(ingredient);
  } else {
    res.status(404).json("Ingredient ID not found");
  }
};

// ----------------------------------------------------------------

// Update an Ingredient by ID
exports.updateIngredientByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const { ingredientId } = req.params;
    const foundIngredient = await Ingredient.findById(ingredientId);
    if (foundIngredient) {
      await foundIngredient.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("Ingredient ID not found");
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
      res.status(404).json("Ingredient ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
