const mongoose = require("mongoose");

const BlogsSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: false,
    trim: true,
  },
  comment: {
    type: String,
    trim: true,
  },
});

module.exports = mongoose.model("Blogs", BlogsSchema);
