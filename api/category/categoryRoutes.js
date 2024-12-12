const express = require("express");
const multer = require("multer");
const router = express.Router();

// ----------------------------------------------------------------

// Category Controllers
const {
  listCategoriesController,
  categoryDetailIdController,
  createCategoryController,
  updateCategoryController,
  deleteCategoryIdController,
} = require("./categoryControllers");

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

// Category Routes

// Create a new Category
router.post("/", upload.single(""), createCategoryController);

// Retrieve all Categories
router.get("/", listCategoriesController);

// Retrieve a Category by ID
router.get("/:categoryId", categoryDetailIdController);

// Update a Category by ID
router.put("/:categoryId", upload.single(""), updateCategoryController);

// Delete a Category by ID
router.delete("/:categoryId", deleteCategoryIdController);

// ----------------------------------------------------------------

module.exports = router;
