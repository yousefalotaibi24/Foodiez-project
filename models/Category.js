const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  // recipeId: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("Categories", categorySchema);
