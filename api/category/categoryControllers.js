// This Controller's function is to Create/Retrieve/Update a Category

const Category = require("../../models/Category");
const Recipe = require("../../models/Recipe");

// ----------------------------------------------------------------

// Create a new Category

const createNewCategory = async (newCategoryData) => {
  console.log("Creating new Category", newCategoryData);
  const newCategory = await Category.create(newCategoryData);
  return newCategory;
};

exports.createCategoryController = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const newCategory = createNewCategory(req.body);
    res.status(201).json(newCategory);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

exports.addRecipes = async (req, res, next) => {
  try {
    const newRecipe = await Recipe.create(req.body);
    await Recipe.findByIdAndUpdate(req.category.id, {
      $push: { recipe: newRecipe._id },
    });
    res.status(201).json(newRecipe);
  } catch (error) {
    next(error);
  }
};

// ----------------------------------------------------------------

// Retrieve all Categories

exports.listCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find().populate("recipe");
    res.status(200).json(categories);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// Retrieve Category by ID

exports.categoryDetailIdController = async (req, res) => {
  const { categoryId } = req.params;
  const category = await Category.findById(categoryId).populate("recipe");
  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404).json("Category ID not found");
  }
};

// ----------------------------------------------------------------

// Update Category by ID

exports.updateCategoryController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("Category ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

// ----------------------------------------------------------------

// Delete Category by ID

exports.deleteCategoryIdController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const foundCategory = await Category.findById(categoryId);
    if (foundCategory) {
      await foundCategory.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("Category ID not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
