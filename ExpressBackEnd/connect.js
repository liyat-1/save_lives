const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDB = (connectionString) => {
  console.log("DB connection....");
  return mongoose.connect(connectionString);
};

module.exports = connectDB;
