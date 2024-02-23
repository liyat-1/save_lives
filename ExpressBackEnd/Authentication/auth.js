const express = require("express");
const router = express.Router();
const Users = require("../schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Ban = require("../banSchema");

const authMiddleWare = (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(200).json({ success: false, msg: "Invalid input!" });
  }
  next();
};
const verifyRequestMiddleWare = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!data) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }

    const user = await Users.findOne({ username: data.username });
    if (!user) {
      return res.status(200).json({ success: false, msg: "please login" });
    }
    req.username = data.username;
    console.log(data);
    req.moneyAmount = user.moneyAmount;

    req.isAdmin = data.isAdmin;
    next();
  } catch (err) {
    return res.status(200).json({ success: false, msg: "please login!" });
  }
};

router.route("/verifyuser").get(async (req, res) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN);
    if (!data) {
      return res.status(200).json({ success: false, msg: "please login!" });
    }

    const user = await Users.findOne({ username: data.username });
    if (!user) {
      return res.status(200).json({ success: false, msg: "please login" });
    }
    const { isAdmin } = data;
    return res.status(200).json({ success: true, isAdmin: isAdmin });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "please login!" });
  }
});

router.route("/login").post(authMiddleWare, async (req, res) => {
  try {
    const { username, password } = req.body;
    const banedUser = await Ban.findOne({ username: username });
    if (banedUser) {
      return res.status(200).json({
        success: false,
        msg: `Account not available`,
      });
    }
    const user = await Users.findOne({ username: username });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, msg: "Incorrect Username!" });
    }

    const hashedPassword = user.password;
    if (await bcrypt.compare(password, hashedPassword)) {
      const { username, password, isAdmin } = user;

      const token = jwt.sign(
        {
          username: username,
          password: password,
          isAdmin: isAdmin,
        },
        process.env.ACCESS_TOKEN
      );

      return res.status(200).json({
        access_token: token,
        isAdmin: isAdmin,
        username: user.username,
        success: true,
      });
    }

    return res.status(200).json({ success: false, msg: "Incorrect Password!" });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try Again!" });
  }
});

router.route("/signup").post(authMiddleWare, async (req, res) => {
  try {
    const { username, password, moneyAmount } = req.body;
    const banUser = await Ban.findOne({ username: username });
    if (banUser) {
      return res
        .status(200)
        .json({ success: false, msg: "Username not allowed" });
    }
    const User = await Users.findOne({ username: username });
    if (User) {
      return res
        .status(200)
        .json({ success: false, msg: "Username already used!" });
    }
    const bandedUser = await Ban.findOne({ username: username });
    if (bandedUser) {
      await Ban.deleteOne({ username: username });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await Users.create({
      username: username,
      password: hashedPassword,
      moneyAmount: moneyAmount,
    });

    const token = jwt.sign(
      {
        username: user.username,
        password: user.password,
        isAdmin: user.isAdmin,
      },
      process.env.ACCESS_TOKEN
    );
    return res.status(200).json({
      success: true,
      access_token: token,
      isAdmin: user.isAdmin,
      username: user.username,
    });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try Again!" });
  }
});

module.exports = { authMiddleWare, verifyRequestMiddleWare, router };
