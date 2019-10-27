const express = require("express");
const createError = require("http-errors");
// const { param } = require("express-validator");

const { wrapAsync } = require("../../middlewares");
const { pictureService } = require("../../services");
const favoritesRouter = express.Router();

const { hasValidationErr } = require("../../middlewares/");

const getFavorites = wrapAsync(async (req, res, next) => {
  const { userId: paramsUserId } = req.params;
  const { include, exclude, sort, userId: queryUserId } = req.query;

  const fields = include || exclude;
  const isInclude = Boolean(include);

  const pictures = await pictureService.getFavorites({
    sort,
    selection: {
      fields,
      isInclude
    },
    userId: paramsUserId || queryUserId
  });

  if (!pictures) {
    throw createError(404, {
      details: "probably, there's not been added yet"
    });
  }

  res.json(pictures);
});

favoritesRouter.get("/", getFavorites);

favoritesRouter.get(
  "/:userId",
  (req, res, next) => {
    req.query.include = "favAmount,name,imagePaths";
    next();
  },
  getFavorites
);

module.exports = favoritesRouter;
