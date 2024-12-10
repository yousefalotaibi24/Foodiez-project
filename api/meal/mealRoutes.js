const express = require("express");
const multer = require("multer"); // to add images
const router = express.Router();
// ----------------------------------------------------------------

const {
  listMealController,
  mealDetailsIdController,
  mealDetailNameController,
  mealDetailCreaterController,
  creatMealController,
  updateMealByIdController,
  deleteMealIdController,
} = require("./mealControllers");
// ----------------------------------------------------------------

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

// ----------------------------------------------------------------
// Route List Under this Line
// ----------------------------------------------------------------
//Meal Routs
// to get all Meal Fetch Get
router.get("/", listMealController);
//to creat a new Meal
router.post("/", upload.single("image"), creatMealController);
// to Update an Meal  by ID
router.put("/:mealId", upload.single("image"), updateMealByIdController);
// to delete an Meal by ID
router.delete("/:mealId", deleteMealIdController);
// to find an Meal by ID
router.get("/:mealId", mealDetailsIdController);
// to find an Meal by Name
router.get("/:mealName", mealDetailNameController);
// to find an Meal by Creater
router.get("/:mealCreater", mealDetailCreaterController);

// ----------------------------------------------------------------

module.exports = router;
