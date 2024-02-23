const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dueDate: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    trim: true,
  },
  moneyAsked: {
    type: Number,
    required: true,
  },
  paidAmount: {
    type: Number,
    default: 0,
  },
  unPaidAmount: {
    type: Number,
    default: 0,
  },
  disease: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalName: {
    type: String,
    required: true,
    trim: true,
  },
  hospitalAccount: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model("Posts", PostSchema);
