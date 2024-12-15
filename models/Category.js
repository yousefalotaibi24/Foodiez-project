const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  recipe: [{ type: Schema.Types.ObjectId, ref: "Recipes" }],
});

module.exports = model("Categories", categorySchema);
