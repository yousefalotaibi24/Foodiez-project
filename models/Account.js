const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
  token: String,
  username: String,
  password: String,
  image: String,
});

module.exports = model("Accounts", accountSchema);
