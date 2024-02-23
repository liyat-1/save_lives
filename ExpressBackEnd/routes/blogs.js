const express = require("express");
const router = express.Router();
const Blogs = require("../blogsSchema");
const Users = require("../schema");
const { verifyRequestMiddleWare } = require("../Authentication/auth");

router.route("/").get(verifyRequestMiddleWare, async (req, res) => {
  try {
    const blogs = await Blogs.find({});

    return res.status(200).json({ blogs: blogs, success: true });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try Again" });
  }
});
router.route("/").post(verifyRequestMiddleWare, async (req, res) => {
  try {
    const { username } = req;
    const { comment } = req.body;

    const blog = await Blogs.create({
      username: username,
      comment: comment,
    });
    return res.status(200).json({
      success: true,
      blog: { username: blog.username, comment: blog.comment },
    });
  } catch (err) {
    console.log(err);
    return res.status(200).json({ success: false });
  }
});

router.route("/:username").delete(verifyRequestMiddleWare, async (req, res) => {
  try {
    const { username } = req.params;
    await Blogs.deleteOne({ username: username });
    return res.status(200).json({ success: true });
  } catch (err) {
    return res.status(200).json({ success: false });
  }
});
module.exports = router;
