const { model, Schema } = require("mongoose");

const ingredientsSchema = new Schema({
  name: String,
  category: [{ type: Schema.Types.ObjectId, ref: "Categories" }],
  recipe: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("Ingredient", ingredientsSchema);
