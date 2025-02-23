const express = require("express");
const router = express.Router();
const authRoutes = require("./authRoutes");
const protectedRoutes = require("./protectedRoutes");

router.use("/api/v1", authRoutes);
router.use("/api/v1", protectedRoutes);

module.exports = router;
