const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: String,
  image: String,
  category: String,
  ingredients: String,
  nutritionFact: String,
  video: String,
  creator: String,
});

module.exports = model("Recipes", RecipesSchema);
