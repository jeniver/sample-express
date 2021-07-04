const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: false },
  email: { type: String, required: false },
  password: { type: String, required: false },
  token_data: {
    access_token: { type: String, required: false },
    access_token_exp: { type: Date, required: false},
    refresh_token: { type: String, required: false },
    refresh_token_exp: { type: Date, required: false },
  },
  created: { type: Date, default: Date.now, required: true },
  updated: { type: Date, default: Date.now, required: true },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
