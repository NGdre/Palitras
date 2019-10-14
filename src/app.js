const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const logger = require("morgan");

const createError = require("./utils/createError");
const index = require("./routes/index");
const app = express();

const IN_PROD = process.env.NODE_ENV === "production";
if (IN_PROD) {
  const fs = require("fs");
  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(logger("combined", { stream: accessLogStream }));
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.use(logger("dev"));
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", index);

app.use("*", (req, res, next) => {
  const err = createError(404, "Page not found", true);
  next(err);
});

app.use((err, req, res, next) => {
  if (!IN_PROD) console.error(err.message || err.data);

  if (!err.statusCode) {
    err.statusCode = 500;
    err.data.message = "internal server error";
  }

  res.status(err.statusCode).json(err.data);
});

module.exports = app;
