const { model, Schema } = require("mongoose");

const UserSchema = new Schema({
    name:String,
    username: {
        type: String,
        unique: true,
    },
    password: String,
});

module.exports = model("users", UserSchema);
