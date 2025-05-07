const express = require("express");
const User = require("../models/User");
const router = express.Router();

// Post request to register a new user
// router.post("/register", async (req, res) => {
//   try {
//     const users = await User.find().exec();
//     res.json({ data: users });
//   } catch (error) {
//     res.status(500).json({ message: "No turf found" });
//   }
// });

// Post request to login a user
// router.post("/login", async (req, res) => {
//   try {
//     const turfs = await Turf.find().exec();
//     res.json({ data: turfs });
//   } catch (error) {
//     res.status(500).json({ message: "No turf found" });
//   }
// });

module.exports = router;
