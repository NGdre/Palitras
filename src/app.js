const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const compression = require("compression");

const controllers = require("./controllers/");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", controllers);

const IN_PROD = process.env.NODE_ENV === "production";
if (IN_PROD) {
  const fs = require("fs");

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(logger("combined", { stream: accessLogStream }));

  app.use(compression());
  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
} else {
  app.use(logger("dev"));
}

app.use((err, req, res, next) => {
  const log = err.statusCode ? `err, ${err.statusCode}, ${err.message}` : err;
  console.error(log);

  if (!err.statusCode) {
    err.message = "internal server error";
    err.statusCode = 500;
  }

  res.status(err.statusCode).json(err);
});

module.exports = app;
