const express = require("express");
const path = require("path");

const bodyParser = require("body-parser");
const logger = require("morgan");

const index = require("./routes/index");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", index);

const IN_PROD = process.env.NODE_ENV === "production";
if (IN_PROD) {
  const fs = require("fs");

  const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    { flags: "a" }
  );
  app.use(logger("combined", { stream: accessLogStream }));

  app.use(express.static(path.join(__dirname, "../client", "build")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
  });
} else {
  app.use(logger("dev"));
}

app.use((err, req, res, next) => {
  console.error(err);

  if (!err.statusCode) {
    err.statusCode = 500;
    err.data.message = "internal server error";
  }

  res.status(err.statusCode).json(err.data);
});

module.exports = app;
