// with yousef
const e = require("express");
const Ingredients = require("../models/Ingredients");
exports.listIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredients.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json(error);
  }
};
exports.ingredientDetail = async (req, res) => {
  const { ingredientId } = req.params;
  const ingredient = await Ingredients.findById(ingredientId);
  if (ingredient) {
    res.status(200).json(ingredient);
  } else {
    res.status(404).json();
  }
};
exports.createIngredient = async (req, res) => {
  const ingredient = new Ingredients(req.body);
  const savedIngredient = await ingredient.save();
  res.status(201).json(savedIngredient);
};
exports.updateIngredient = async (req, res) => {
  const { ingredientId } = req.params;
  const foundIngredient = await Ingredients.findById(ingredientId);
  if (foundIngredient) {
    await foundIngredient.updateOne(req.body);
    res.status(202).json();
  } else {
    res.status(404).json();
  }
};
exports.deleteIngredient = async (req, res) => {
  const { ingredientId } = req.params;
  const foundIngredient = await Ingredients.findById(ingredientId);
  if (foundIngredient) {
    await foundIngredient.deleteOne();
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};
