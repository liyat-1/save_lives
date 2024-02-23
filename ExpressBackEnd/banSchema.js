const mongoose = require("mongoose");

const BanSchema = new mongoose.Schema({
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
  moneyAmount: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Ban", BanSchema);
