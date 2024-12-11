const express = require("express");
const multer = require("multer");
const router = express.Router();

// Ingredient Controllers
const {
  listIngredientsController,
  ingredientDetailIdController,
  ingredientDetailNameController,
  createIngredientController,
  updateIngredientByIdController,
  deleteIngredientIdController,
} = require("./ingredientsControllers");

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

// Retrieve all Ingredients
router.get("/", listIngredientsController);

// Create a new Ingredient
router.post("/", upload.single("image"), createIngredientController);

// Update an Ingredient by ID
router.put("/:ingredientId", updateIngredientByIdController);

// Delete an Ingredient by ID
router.delete("/:ingredientId", deleteIngredientIdController);

// Retrieve an Ingredient by ID
router.get("/:ingredientId", ingredientDetailIdController);

// Retrieve an Ingredient by Name
router.get("/:ingredientName", ingredientDetailNameController);

module.exports = router;
