const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const redisClient = require("../../config/redis");
const { sendOTP } = require("../utils/otpService");

const register = async (req, res) => {
  try {
    const { phone, password, role } = req.body;
    if (!phone || !password || !role) {
      return res
        .status(400)
        .json({ status: false, message: "All fields are required." });
    }
    const existingUser = await User.findOne({ where: { phone } });
    if (existingUser)
      return res.status(400).json({
        status: false,
        message: "User already registered. Please log in.",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ phone, password: hashedPassword, role });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisClient.setEx(`otp:${phone}`, 300, otp);
    console.log("otp--", otp);

    const optSend = sendOTP(phone, otp);
    if (optSend) {
      return res.status(201).json({
        status: true,
        message: "OTP sent, please verify your account.",
      });
    } else {
      return res.status(400).json({
        status: false,
        message: "OTP not sent, please try again.",
      });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    const storedOTP = await redisClient.get(`otp:${phone}`);

    if (storedOTP !== otp)
      return res
        .status(400)
        .json({ status: false, message: "Invalid or expired OTP" });

    await User.update({ verified: true }, { where: { phone } });
    await redisClient.del(`otp:${phone}`);

    res.json({ status: true, message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    const user = await User.findOne({ where: { phone } });
    console.log(
      "process.env.REFRESH_TOKEN_SECRET--",
      process.env.REFRESH_TOKEN_SECRET
    );

    if (!user || !user.verified)
      return res
        .status(400)
        .json({ status: false, message: "User not found or not verified" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: false, message: "Incorrect credentials" });

    const accessToken = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, phone: user.phone, role: user.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === "production",
    //   sameSite: "Strict",
    // });
    await redisClient.setEx(
      `refreshToken:${user.id}`,
      7 * 24 * 60 * 60,
      refreshToken
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.json({ status: true, message: "Login successful", token: accessToken });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

const refreshToken = async (req, res) => {
  // const refreshToken = req.cookies.refreshToken;

  // if (!refreshToken) {
  //   return res
  //     .status(401)
  //     .json({ status: false, message: "Unauthorized, no refresh token" });
  // }
  const { userId } = req.body;
  console.log("userId--", req.body);

  try {
    const storedRefreshToken = await redisClient.get(`refreshToken:${userId}`);

    if (!storedRefreshToken) {
      return res
        .status(401)
        .json({ status: false, message: "Unauthorized, no refresh token" });
    }
    const decoded = jwt.verify(
      storedRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const newAccessToken = jwt.sign(
      { id: decoded.id, phone: decoded.phone, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ status: true, token: newAccessToken });
  } catch (error) {
    return res
      .status(403)
      .json({ status: false, message: "Invalid refresh token" });
  }
};

const logout = async (req, res) => {
  const { userId } = req.body;

  if (userId) {
    await redisClient.del(`refreshToken:${userId}`);
  }
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res.json({ status: true, message: "Logout successful" });
};

module.exports = { register, verifyOTP, login, refreshToken, logout };
