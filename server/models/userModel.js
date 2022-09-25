const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    max: 20,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    max: 50,
  },
  password: {
    type: String,
    required: true,
    max: 80,
  },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});

const Users = mongoose.model("Users",userSchema);
module.exports = Users;
