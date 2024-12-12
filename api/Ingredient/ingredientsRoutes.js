const express = require("express");
const multer = require("multer");
const router = express.Router();

// ----------------------------------------------------------------

// Ingredient Controllers
const {
  listIngredientsController,
  ingredientDetailIdController,
  createIngredientController,
  updateIngredientByIdController,
  deleteIngredientIdController,
} = require("./ingredientsControllers");

// ----------------------------------------------------------------

// To Store Images

const storage = multer.diskStorage({
  destination: "./media",
  filename: (req, file, cb) => {
    cb(null, `${+new Date()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

// ----------------------------------------------------------------

// Ingredient Routes

// Create a new Ingredient
router.post("/", upload.single(""), createIngredientController);

// Retrieve all Ingredients
router.get("/", listIngredientsController);

// Retrieve an Ingredient by ID
router.get("/:ingredientId", ingredientDetailIdController);

// Update an Ingredient by ID
router.put("/:ingredientId", upload.single(""), updateIngredientByIdController);

// Delete an Ingredient by ID
router.delete("/:ingredientId", deleteIngredientIdController);

// ----------------------------------------------------------------

module.exports = router;
