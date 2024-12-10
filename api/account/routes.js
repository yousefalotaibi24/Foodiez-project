const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();

// our controllers
const {
  creatAccountController,
  accountDetailIdController,
  accountDetailUserController,
  listAccountsController,
  updateAccountController,
  deleteAccountIdController,
} = require("./accountControllers")

const {
  listCategoriesController,
  categoryDetailIdController,
  categoryDetailNameController,
  creatCategoryController,
  updateCategoryByIdController,
  deleteCategoryIdController,
} = require("./categoryControllers");

const {
  listIngredientsController,
  ingredientDetailIdController,
  ingredientDetailNameController,
  createIngredientController,
  updateIngredientByIdController,
  deleteIngredientIdController,
} = require("./ingredientsControllers");

const {
  listMealController,
  mealDetailsIdController,
  mealDetailNameController,
  mealDetailCreaterController,
  creatMealController,
  updateMealByIdController,
  deleteMealIdController,
} = require("./mealControllers");

// to store images
const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
}); // add this from lesson upload image  multer

const upload = multer({
  storage,
}); // add this from lesson upload image  multer

// Route List Under this Line
//Account Routs

//Category Routs

//Ingredients Routs

//Meal Routs

module.exports = router;
