const express = require("express");
const userRouter = express.Router();
const createError = require("http-errors");
const { param } = require("express-validator");

const { userService, pictureService } = require("../../services");

const {
  verify,
  wrapAsync,
  findUser,
  hasValidationErr
} = require("../../middlewares");

const getUsers = async (req, res) => {
  const users = await userService.getUsers();

  res.json(users);
};

const getMyUser = async (req, res) => {
  const { userId } = req;

  const user = await userService.getUserInfo(userId);

  res.json(user);
};

const getUserById = async (req, res, next) => {
  const { userId: id } = req.params;

  const user = await userService.getUser(id);
  res.json(user);
};

const getMyFavorites = async (req, res) => {
  const { user } = res.locals;
  const pictures = await userService.getFavorites(user.id);
  res.json(pictures);
};

const getMyPictures = async (req, res) => {
  const { user } = res.locals;
  const pictures = await userService.getMyPictures(user.id);
  res.json(pictures);
};

const addPictureInFavorites = wrapAsync(async (req, res) => {
  const { pictureId: id } = req.params;
  const { user } = res.locals;

  const result = await pictureService.addInFavorites(id, user);

  if (!result.updated) {
    throw createError(400, {
      message: "picture has already been added!"
    });
  }

  res.status(201).json({ message: "picture were added in favorites" });
});

const removePictureFromFavorites = wrapAsync(async (req, res) => {
  const { pictureId: id } = req.params;
  const { user } = res.locals;

  const result = await pictureService.removeFromFavorites(id, user);

  if (!result.updated) {
    throw createError(400, {
      message: "picture has already been removed from favorites!"
    });
  }

  res.status(200).json({ message: "picture were removed from favorites!" });
});

userRouter.use(["/me"], verify);
userRouter.use(["/me"], findUser.byId);

userRouter.use(
  ["/me/favorite/:pictureId", "/me/unfavorite/:pictureId"],
  param("pictureId")
    .exists()
    .isMongoId(),
  hasValidationErr
);

userRouter.get("/", getUsers);

userRouter.get("/me", getMyUser);

userRouter.get("/me/favorites", getMyFavorites);

userRouter.get("/me/pictures", getMyPictures);

userRouter.patch("/me/favorite/:pictureId", addPictureInFavorites);

userRouter.delete("/me/unfavorite/:pictureId", removePictureFromFavorites);

userRouter.use(
  "/:userId",
  param("userId")
    .exists()
    .isMongoId(),
  hasValidationErr
);

userRouter.get("/:userId", getUserById);

module.exports = userRouter;
