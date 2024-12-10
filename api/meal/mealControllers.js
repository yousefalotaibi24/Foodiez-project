// this controller is created to add/Modify/Read a new Meal

const Meal = require("../../models/Meal");

// ----------------------------------------------------------------
// to create a New Meal
const creatNewMeal = async (newMealData) => {
  console.log("Creating new Category", newMealData);
  const newMeal = await Category.create(newMealData);
  return newMeal;
};
exports.creatMealController = (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const newMeal = creatNewMeal(req.body);
    res.status(201).json(newMeal);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
}; 

// ----------------------------------------------------------------
// to get all Meals List
exports.listMealController = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ----------------------------------------------------------------
// to find Meal
// by ID
exports.mealDetailsIdController = async (req, res) => {
  const { mealId } = req.params;
  const meal = await Meal.findById(mealId);
  if (meal) {
    res.status(200).json(meal);
  } else {
    res.status(404).json();
  }
};
// by Name of Meal
exports.mealDetailNameController = (req, res) => {
  const { mealName } = req.params;
  const name = Meal.find(
    (name) => name.mealName.toLowerCase() === mealName.toLowerCase()
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
}; // check we can use NAME same as in Categopries
// by creater of Meal
exports.mealDetailCreaterController = (req, res) => {
  const { mealCreater } = req.params;
  const name = Meal.find(
    (name) => name.mealCreater.toLowerCase() === mealCreater.toLowerCase()
  );
  console.log(name);
  if (name) {
    res.status(200).json(name);
  } else {
    res.status(404).json();
  }
}; // check we can use NAME same as in Categopries

// ----------------------------------------------------------------
// to update a Meal
// by ID
exports.updateMealByIdController = async (req, res) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`; //updated file to upload image
    }
    const { mealId } = req.params;
    const foundMeal = await Category.findById(mealId);
    if (foundMeal) {
      await foundMeal.updateOne(req.body);
      res.status(202).json();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
// By name of Meal

// ----------------------------------------------------------------
// to delete a Meal
//by ID
exports.deleteMealIdController = async (req, res) => {
  try {
    const { mealId } = req.params;
    const foundMeal = await Category.findById(mealId);
    if (foundMeal) {
      await foundMeal.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json("not found");
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};
//by Name of Controller


// ----------------------------------------------------------------
//END of Controller