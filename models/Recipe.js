const { model, Schema } = require("mongoose");

const RecipesSchema = new Schema({
  name: String,
  image: String,
  category: { type: Schema.Types.ObjectId, ref: "Categories" },
  ingredient: [{ type: Schema.Types.ObjectId, ref: "Ingredient" }],
  creator: {type: Schema.Types.ObjectId, }
});

module.exports = model("Recipes", RecipesSchema);
