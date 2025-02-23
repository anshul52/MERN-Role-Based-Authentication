const express = require("express");
const { authenticate, authorize } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/user/profile", authenticate, (req, res) => {
  res.json({ message: "Welcome User", user: req.user });
});

router.get(
  "/admin/dashboard",
  authenticate,
  authorize(["Admin"]),
  (req, res) => {
    res.json({ message: "Welcome Admin", user: req.user });
  }
);

module.exports = router;
