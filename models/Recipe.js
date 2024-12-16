const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: String,
  image: String,
  category: String,
  ingredients: String,
  nutritionFact: String,
  video: String,
  creator: String,
  ingredient: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
});

module.exports = model("Recipes", RecipesSchema);
