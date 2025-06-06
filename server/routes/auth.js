const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  registerOwner,
  googleLogin,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/register-owner", registerOwner);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getMe);
router.post("/google", googleLogin);

module.exports = router;
