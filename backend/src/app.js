require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");

const app = express();
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true }));

app.use(router);
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});
app.use(errorHandler);
module.exports = app;
