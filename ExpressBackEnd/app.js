const express = require("express");
const { connect } = require("mongoose");
const app = express();
const port = 8888;
const connectDB = require("./connect");

const userRouter = require("./routes/users");
const blogsRouter = require("./routes/blogs");
const adminRouter = require("./routes/admin");
const authRouter = require("./Authentication/auth");
const cors = require("cors");

require("dotenv").config();
app.use(express.json());
app.use(cors());
app.use("/api/user", userRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/auth", authRouter.router);

const start = async () => {
  try {
    console.log(process.env.MONGO_URL);
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();

// app.post("/login", (req, res) => {});

// app.listen(port, console.log("sever listening on port 5000"));
