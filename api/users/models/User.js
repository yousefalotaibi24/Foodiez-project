const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
});

module.exports = model("User", UserSchema);
