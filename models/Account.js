const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
  username: String,
  name: String,
  password: String,
  image: String,
});

module.exports = model("Account", accountSchema);
