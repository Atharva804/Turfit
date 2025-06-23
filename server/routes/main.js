const express = require("express");
const router = express.Router();

const User = require("../models/User");

router.get("/", (req, res) => {
  res.send("Welcome to the Turfit server!");
});
router.put("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const editedUser = await User.findByIdAndUpdate(userId, updatedUser, {
    new: true,
  });
  if (!editedUser || editedUser.length === 0) {
    return res.status(404).json({ data: "No user found!" });
  }
  res.json({ data: "successfully edited the user" });
});

module.exports = router;
