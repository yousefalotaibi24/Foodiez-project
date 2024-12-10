const { model, Schema } = require("mongoose");

const MealSchema = new Schema({
  name: String,
  image: String,
  category: String,
  ingredients: String,
  nutritionFact: String,
  video: String,
  creater: String,
});

module.exports = model("Meal", MealSchema);
