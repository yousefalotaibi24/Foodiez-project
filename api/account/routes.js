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
} = require("./accountControllers");

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
// ----------------------------------------------------------------
//Account Routs
// to get all accounts/ users Fetch Get
router.get("/accounts/", listAccountsController);
//to creat a new Account
router.post("/accounts/", upload.single("image"), creatAccountController);
// to Update an account accounts/ users by ID
router.put(
  "/accounts/:accountId",
  upload.single("image"),
  updateAccountController
);
// to delete an account accounts/ users by ID
router.delete("/accounts/:accountId", deleteAccountIdController);
// to delete an account accounts/ users by UserName

// to find an account by ID
router.get("/accounts/:accountId", accountDetailIdController);
// to find an account by UserName
router.get("/accounts/:userName", accountDetailUserController);
// ----------------------------------------------------------------
//Category Routs
// to get all Category Fetch Get
router.get("/categories/", listCategoriesController);
//to creat a new Category
router.post("/categories/", upload.single("image"), creatCategoryController);
// to Update an Category  by ID
router.put(
  "/categories/:categoryId",
  upload.single("image"),
  updateCategoryByIdController
);
// to Update an Category by Name

// to delete an Category by ID
router.delete("/categories/:categoryId", deleteCategoryIdController);
// to delete an Category Name

// to find an Category by ID
router.get("/categories/:categoryId", categoryDetailIdController);
// to find an Category by Name
router.get("/categories/:categoryName", categoryDetailNameController);
// ----------------------------------------------------------------
//Ingredients Routs
// to get all Ingredients Fetch Get
router.get("/ingredients/", listIngredientsController);
//to creat a new Ingredients
router.post(
  "/ingredients/",
  upload.single("image"),
  createIngredientController
);
// to Update an Ingredients  by ID
router.put(
  "/ingredients/:ingredientId",
  upload.single("image"),
  updateIngredientByIdController
);
// to Update an Ingredients by Name

// to delete an Ingredients by ID
router.delete("/ingredients/:ingredientId", deleteIngredientIdController);
// to delete an Ingredients by name

// to find an Ingredients by ID
router.get("/ingredients/:ingredientId", ingredientDetailIdController);
// to find an Ingredients by Name
router.get("/ingredients/:ingredientName", ingredientDetailNameController);

// ----------------------------------------------------------------
//Meal Routs
// to get all Meal Fetch Get
router.get("/meal/", listMealController);
//to creat a new Meal
router.post("/meal/", upload.single("image"), creatMealController);
// to Update an Meal  by ID
router.put("/meal/:mealId", upload.single("image"), updateMealByIdController);
// to Update an Meal by Name

// to delete an Meal by ID
router.delete("/meal/:mealId", deleteMealIdController);
// to delete an Meal by name

// to find an Meal by ID
router.get("/meal/:mealId", mealDetailsIdController);
// to find an Meal by Name
router.get("/meal/:mealName", mealDetailNameController);
// to find an Meal by Creater
router.get("/meal/:mealCreater", mealDetailCreaterController);

// ----------------------------------------------------------------

module.exports = router;
