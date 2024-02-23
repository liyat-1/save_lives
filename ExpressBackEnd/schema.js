const mongoose = require("mongoose");

const Userschema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    unique: true,
    maxlength: [20, "name cannot be more than 20 characters"],
  },
  password: {
    type: String,
    required: [true, "must provide password"],
    trim: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  moneyAmount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Users", Userschema);
