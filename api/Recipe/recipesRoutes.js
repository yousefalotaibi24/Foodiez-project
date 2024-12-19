const express = require("express");
const multer = require("multer");
const router = express.Router();
const passport = require("passport");
// ----------------------------------------------------------------

// Recipe Controllers

const {
  listRecipesController,
  RecipesDetailsController,
  createRecipesController,
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
router.post("/", upload.single("image"),passport.authenticate('jwt',{session: false}), createRecipesController);

// Create a new Recipe with Ingredients
router.post("/:RecipesId/ingredientId",passport.authenticate('jwt',{session: false}), addIngredients);

// Retrieve all Recipes
router.get("/", listRecipesController);

// Retrieve a Recipe by ID
router.get("/:RecipesId", RecipesDetailsController);

// Update a Recipe by ID
router.put("/:RecipesId", upload.single("image"),passport.authenticate('jwt',{session: false}), updateRecipesByIdController);

// Delete a Recipe by ID
router.delete("/:RecipesId",passport.authenticate('jwt',{session: false}), deleteRecipesIdController);

// ----------------------------------------------------------------

module.exports = router;
