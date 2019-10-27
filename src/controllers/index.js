const express = require("express");
const router = express.Router();

const auth = require("./api/auth");
const picture = require("./api/picture");
const user = require("./api/user");
const favorites = require("./api/favorites");

router.use("/api/auth", auth);
router.use("/api/pictures", picture);
router.use("/api/users", user);
router.use("/api/favorites", favorites);

module.exports = router;
