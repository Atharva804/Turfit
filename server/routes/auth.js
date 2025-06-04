const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  registerOwner,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/register-owner", registerOwner);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);

module.exports = router;
