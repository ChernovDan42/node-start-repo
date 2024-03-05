const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({
  path:
    process.env.NODE_ENV === "production"
      ? "./envs/production.env"
      : "./envs/development.env",
});

const app = express();

const serverConfigs = require("./configs/serverConfigs");

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (serverConfigs.environment === "production") {
    return res.status(err.status ?? 500).json({
      message:
        !err.status || err.status === 500
          ? "Internal server error"
          : err.message,
    });
  }

  res.status(err.status ?? 500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = app;
