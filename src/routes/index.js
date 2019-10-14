const express = require("express");
const router = express.Router();

const auth = require("./api/auth");
const picture = require("./api/picture");
const user = require("./api/user");

const { findUser, verify } = require("../middlewares/");

router.use(
  [
    "/api/upload-picture",
    "/api/remove-picture",
    "/api/add-favorite",
    "/api/remove-favorite",
    "/api/get-favorites",
    "/api/get-my-pictures",
    "/api/update-picture"
  ],
  verify,
  findUser.byId
);

router.use("/api", auth, picture, user);

module.exports = router;
