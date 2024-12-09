const { model, Schema } = require("mongoose");

const accountSchema = new Schema({
  username: String,
  name: String,
  password: String,
  profileImage: String,
});

module.exports = model("Account", accountSchema);
