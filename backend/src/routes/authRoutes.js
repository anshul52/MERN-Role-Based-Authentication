const express = require("express");
const { otpVerifyLimiter } = require("../middleware/rateLimiter");
const {
  register,
  verifyOTP,
  login,
  refreshToken,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/verify-otp", otpVerifyLimiter, verifyOTP);
router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.post("/logout", logout);

module.exports = router;
