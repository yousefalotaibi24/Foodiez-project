const { model, Schema } = require("mongoose");

const ingredientsSchema = new Schema({
  name: String,
  recipe: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("Ingredient", ingredientsSchema);
