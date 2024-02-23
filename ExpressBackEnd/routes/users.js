const express = require("express");
const router = express.Router();
const Users = require("../schema");
const Posts = require("../postSchema");
const ApprovedPosts = require("../approvedPostSchema");

const bcrypt = require("bcrypt");

const { verifyRequestMiddleWare } = require("../Authentication/auth");

require("dotenv").config();

router.route("/posts").get(verifyRequestMiddleWare, async (req, res) => {
  try {
    const posts = await Posts.find({});
    if (!posts || posts.length === 0) {
      return res.status(200).json({ success: false, msg: "No post available" });
    }
    return res.status(200).json({ success: true, posts });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try again!" });
  }
});
router
  .route("/approvedposts")
  .get(verifyRequestMiddleWare, async (req, res) => {
    try {
      const approvedPosts = await ApprovedPosts.find({});
      if (!approvedPosts || approvedPosts.length === 0) {
        return res
          .status(200)
          .json({ success: false, msg: "No post available" });
      }

      return res.status(200).json({ success: true, approvedPosts });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Try again!" });
    }
  });
router.route("/post").post(verifyRequestMiddleWare, async (req, res) => {
  try {
    const {
      username,
      age,
      dueDate,
      gender,
      moneyAsked,
      disease,
      hospitalName,
      hospitalAccount,
    } = req.body;

    if (
      !username ||
      !age ||
      !dueDate ||
      !gender ||
      !moneyAsked ||
      !disease ||
      !hospitalAccount ||
      !hospitalName
    ) {
      return res.status(200).json({ success: false, msg: "Input missing" });
    }
    if (username !== req.username) {
      return res.status(200).json({ success: false, msg: "Invalid username" });
    }
    const approvedPost = await ApprovedPosts.findOne({ username: username });
    console.log(approvedPost);
    if (approvedPost) {
      return res.status(200).json({ success: false, msg: "Already posted!" });
    }
    const post = await Posts.findOne({ username: username });
    if (post) {
      return res.status(200).json({ success: false, msg: "Already posted!" });
    }
    console.log(post);

    await Posts.create({
      username: username,
      age: age,
      dueDate: dueDate,
      gender: gender,
      moneyAsked: moneyAsked,
      disease: disease,
      hospitalAccount: hospitalAccount,
      hospitalName: hospitalName,
    });

    return res.status(200).json({
      success: true,
      post: {
        username: username,
        age: age,
        dueDate: dueDate,
        gender: gender,
        moneyAsked: moneyAsked,
        disease: disease,
        paidAmount: 0,
        hospitalName: hospitalName,
        hospitalAccount: hospitalAccount,
      },
    });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Already posted!" });
  }
});
router
  .route("/pendingpost/:name")
  .delete(verifyRequestMiddleWare, async (req, res) => {
    try {
      const { name } = req.params;
      if (!name) {
        return res.status(200).json({ success: false, msg: "Invalid input" });
      }
      const user = await Users.findOne({ username: name });
      if (!user) {
        return res.status(200).json({ success: false, msg: "Invaild user" });
      }

      await Posts.deleteOne({ username: name });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Try again" });
    }
  });
router
  .route("/post/:name")
  .get(verifyRequestMiddleWare, async (req, res) => {
    try {
      const { name } = req.params;
      const post = await Posts.findOne({ username: name });
      if (!post) {
        const approvedPost = await ApprovedPosts.findOne({
          username: name,
        });
        if (!approvedPost) {
          return res.status(200).json({
            success: false,
            msg: "No available post!",
            status: "No Post",
          });
        }
        const {
          username,
          age,
          dueDate,
          gender,
          moneyAsked,
          paidAmount,
          disease,
          hospitalAccount,
          hospitalName,
        } = approvedPost;
        return res.status(200).json({
          success: true,
          post: {
            username,
            age,
            dueDate,
            gender,
            moneyAsked,
            paidAmount,
            disease,
            hospitalAccount,
            hospitalName,
          },
          status: "Approved",
        });
      }
      const {
        username,
        age,
        dueDate,
        gender,
        moneyAsked,
        paidAmount,
        disease,
        hospitalAccount,
        hospitalName,
      } = post;
      return res.status(200).json({
        success: true,
        post: {
          username,
          age,
          dueDate,
          gender,
          moneyAsked,
          paidAmount,
          disease,
          hospitalAccount,
          hospitalName,
        },
        status: "Pending",
      });
    } catch (err) {
      return res
        .status(200)
        .json({ success: false, msg: "Try Again!", status: "Error" });
    }
  })
  .delete(verifyRequestMiddleWare, async (req, res) => {
    try {
      const { name } = req.params;

      const userPost = await Posts.findOne({ username: name });

      if (!userPost) {
        const userApprovedPost = await ApprovedPosts.findOne({
          username: name,
        });
        if (!userApprovedPost) {
          return res
            .status(200)
            .json({ success: false, msg: "post not found!" });
        }
        await ApprovedPosts.deleteOne({ username: name });
        return res.status(200).json({ success: true });
      }
      await Posts.deleteOne({ username: name });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Failed!" });
    }
  })
  .patch(verifyRequestMiddleWare, async (req, res) => {
    try {
      const { money } = req.body;
      const { name } = req.params;

      if (!money) {
        return res
          .status(200)
          .json({ success: false, msg: "Money unavailable!" });
      }
      const { moneyAmount } = req;

      if (Number(money) > moneyAmount) {
        return res
          .status(200)
          .json({ success: false, msg: "Not enough money!" });
      }

      const userPost = await Posts.findOne({ username: name });
      const userApprovedPost = await ApprovedPosts.findOne({
        username: name,
      });
      if (!userPost && !userApprovedPost) {
        return res.status(200).json({ success: false, msg: "Post not found" });
      }

      if (!userPost) {
        if (!userApprovedPost) {
          return res
            .status(200)
            .json({ success: false, msg: "post not found!" });
        }
        const { moneyAsked, paidAmount, username } = userApprovedPost;
        if (name !== username) {
          return res.status(200).json({ success: false, msg: "Unauthorized" });
        }
        const unPaidAmount = moneyAsked - paidAmount;
        if (unPaidAmount !== 0) {
          if (unPaidAmount < Number(money)) {
            await ApprovedPosts.findOneAndUpdate(
              { username: name },
              { paidAmount: moneyAsked }
            );
            await Users.findOneAndUpdate(
              { username: req.username },
              { moneyAmount: moneyAmount - unPaidAmount }
            );
            return res.status(200).json({ success: true });
          }
          await ApprovedPosts.findOneAndUpdate(
            { username: name },
            { paidAmount: paidAmount + Number(money) }
          );
          await Users.findOneAndUpdate(
            { username: req.username },
            { moneyAmount: moneyAmount - Number(money) }
          );

          return res.status(200).json({ success: true });
        } else {
          return res.status(200).json({ success: false, msg: "fully paid!" });
        }
      }
      const { moneyAsked, paidAmount, username } = userPost;
      const unPaidAmount = moneyAsked - paidAmount;

      if (name !== username) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }
      if (unPaidAmount !== 0) {
        if (unPaidAmount < Number(money)) {
          await Posts.findOneAndUpdate(
            { username: name },
            { paidAmount: moneyAsked }
          );

          await Users.findOneAndUpdate(
            { username: req.username },
            { moneyAmount: moneyAmount - unPaidAmount }
          );

          return res.status(200).json({ success: true });
        }
        await Posts.findOneAndUpdate(
          { username: name },
          { paidAmount: paidAmount + Number(money) }
        );
        await Users.findOneAndUpdate(
          { username: req.username },
          { moneyAmount: moneyAmount - Number(money) }
        );

        return res.status(200).json({ success: true });
      } else {
        return res.status(200).json({ success: false, msg: "fully paid!" });
      }
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Failed!" });
    }
  });
router
  .route("/approvedpost/:name")
  .get(verifyRequestMiddleWare, async (req, res) => {
    try {
      const { name } = req.params;
      const approvedPost = ApprovedPosts.findOne({ username: name });

      if (!approvedPost.username) {
        return res.status(200).json({ success: false, msg: "Post not found" });
      }
      const {
        username,
        age,
        dueDate,
        gender,
        moneyAsked,
        paidAmount,
        disease,
        hospitalAccount,
        hospitalName,
      } = approvedPost;
      return res.status(200).json({
        success: true,
        post: {
          username,
          age,
          dueDate,
          gender,
          moneyAsked,
          paidAmount,
          disease,
          hospitalAccount,
          hospitalName,
        },
      });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Try Again!" });
    }
  });

router.route("/:username").patch(verifyRequestMiddleWare, async (req, res) => {
  try {
    const { username } = req.params;

    const { newPassword, oldPassword } = req.body;
    if (!username) {
      return res.status(200).json({ success: false, msg: "Invalid input" });
    }

    if (!newPassword || !oldPassword) {
      return res.status(200).json({ success: false, msg: "Invalid input" });
    }

    if (username !== req.username) {
      return res.status(200).json({ success: false, msg: "Invalid Username" });
    }

    const user = await Users.findOne({
      username: username,
    });

    if (!user) {
      return res.status(200).json({ success: false, msg: "No user is found!" });
    }
    const hashedPassword = user.password;
    const truth = await bcrypt.compare(oldPassword, hashedPassword);

    if (!truth) {
      return res
        .status(200)
        .json({ success: false, msg: "Incorrect old password" });
    }

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(newPassword, salt);

    if (user.isAdmin) {
      await Users.findOneAndUpdate(
        { username: username },
        { password: newHashedPassword },
        {
          isAdmin: true,
        }
      );
    }
    await Users.findOneAndUpdate(
      { username: username },
      { password: newHashedPassword }
    );
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try again" });
  }
});
module.exports = router;
