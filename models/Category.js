const { model, Schema } = require("mongoose");

const categorySchema = new Schema({
  name: String,
});

module.exports = model("Categories", categorySchema);
