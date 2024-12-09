const { model, Schema } = require("mongoose");

const mealSchema = new Schema({
  name: String,
  image: String,
  category: String,
  ingredients: String,
  nutritionFact: String,
  video: String,
  username: String,
});

module.exports = model("Meal", mealSchema);
