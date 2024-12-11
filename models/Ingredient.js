const { model, Schema } = require("mongoose");

const ingredientsSchema = new Schema({
  name: String,
});

module.exports = model("Ingredients", ingredientsSchema);
