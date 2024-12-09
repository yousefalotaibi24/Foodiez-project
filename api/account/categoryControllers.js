// with yousef

const Category = require("../models/Category");
exports.listCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.categoryDetail = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId);
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json();
  }
};

exports.createCategory = async (req, res) => {
  const category = new Category(req.body);
  const savedCategory = await category.save();
  res.status(201).json(savedCategory);
};

exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await Category.findById(categoryId);
  if (foundCategory) {
    await foundCategory.updateOne(req.body);
    res.status(202).json();
  } else {
    res.status(404).json();
  }
};

exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const foundCategory = await Category.findById(categoryId);
  if (foundCategory) {
    await foundCategory.deleteOne();
    res.status(204).end();
  } else {
    res.status(404).json();
  }
};
