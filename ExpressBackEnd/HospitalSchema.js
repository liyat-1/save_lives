const mongoose = require("mongoose");

const HospitalSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    required: true,
    trim: true,
  },
  moneyPaid: {
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

module.exports = mongoose.model("Hospital", HospitalSchema);
