const express = require("express");
const multer = require("multer");
const router = express.Router();

// Category Controllers
const {
  listCategoriesController,
  categoryDetailIdController,
  categoryDetailNameController,
  createCategoryController,
  updateCategoryByIdController,
  deleteCategoryIdController,
} = require("./categoryControllers");

// ----------------------------------------------------------------

// Category Routes

// Retrieve all Categories
router.get("/", listCategoriesController);

// Create a new Category
router.post("/", createCategoryController);

// Update a Category by ID
router.put("/:categoryId", updateCategoryByIdController);

// Delete a Category by ID
router.delete("/:categoryId", deleteCategoryIdController);

// Retrieve a Category by ID
router.get("/:categoryId", categoryDetailIdController);

// to find an Category by Name
router.get("/:categoryName", categoryDetailNameController);

module.exports = router;
