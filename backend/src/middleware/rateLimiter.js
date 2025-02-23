const rateLimit = require("express-rate-limit");

const otpVerifyLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
  message: { status: false, message: "Too many attempts. Try again later." },
  standardHeaders: true,
  legacyHeaders: false,
});
module.exports = { otpVerifyLimiter };
