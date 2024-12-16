const express = require("express");
const multer = require("multer");
const router = express.Router();

// ----------------------------------------------------------------

// Recipe Controllers

const {
  listRecipesController,
  RecipesDetailsController,
  creatRecipesController,
  updateRecipesByIdController,
  deleteRecipesIdController,
  addIngredients,
} = require("./recipesControllers");

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

// Recipes Routes

// Create a new Recipe
router.post("/", upload.single("image"), creatRecipesController);

// Create a new Recipe with Ingredients
router.post("/:RecipesId/ingredientId", addIngredients);

// Retrieve all Recipes
router.get("/", listRecipesController);

// Retrieve a Recipe by ID
router.get("/:RecipesId", RecipesDetailsController);

// Update a Recipe by ID
router.put("/:RecipesId", upload.single("image"), updateRecipesByIdController);

// Delete a Recipe by ID
router.delete("/:RecipesId", deleteRecipesIdController);

// ----------------------------------------------------------------

module.exports = router;
