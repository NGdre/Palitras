const express = require("express");
const multer = require("multer");
const path = require("path");

const { Types } = require("mongoose");
const createError = require("http-errors");
const { param } = require("express-validator");

const { wrapAsync } = require("../../middlewares");
const { pictureService } = require("../../services");
const pictureRouter = express.Router();

const { hasValidationErr, verify, findUser } = require("../../middlewares/");

const {
  checkImageFileType,
  createImageFileName
} = require("../../utils/helpers");

const ImageManager = require("../../utils/ImageManager");

const destinationPath =
  process.env.NODE_ENV === "production"
    ? "client/build/uploads"
    : "client/public/uploads";

const destination = path.resolve(
  __dirname,
  `../../../${destinationPath}/images/`
);

const public = "/uploads/images";

const storage = multer.diskStorage({
  destination,
  filename: (req, file, cb) => {
    cb(null, createImageFileName({ file }, { temp: true }));
  }
});

const upload = multer({
  storage,
  limits: 2048 * 1024,
  fileFilter: (req, file, cb) => checkImageFileType(file, cb)
}).single("picture");

const createPicture = wrapAsync(async (req, res) => {
  const { user } = res.locals;
  const { file } = req;

  const id = Types.ObjectId();

  const imageWidths = [1280, 1024, 768, 512, 256];

  const imageManager = new ImageManager(file, {
    id,
    widths: imageWidths,
    public
  });

  const result = await imageManager.upload();

  if (!result.isUploaded) {
    throw createError(400, {
      message: "image is not uploaded"
    });
  }

  const data = {
    _id: id,
    name: req.body.name,
    author: user,
    imagePaths: result.imagePaths
  };

  const picture = await pictureService.addPicture(data);

  if (!picture) {
    throw createError(400, {
      message: "can't upload"
    });
  }

  res.status(201).json({
    message: "image successfuly uploaded!",
    picture
  });
});

const getPictures = wrapAsync(async (req, res) => {
  const { include, exclude, sort, page, limit, author } = req.query;

  const fields = include || exclude;
  const isInclude = Boolean(include);

  const pictures = await pictureService.getPictures({
    sort,
    selection: {
      fields,
      isInclude
    },
    page: +page,
    limit: +limit,
    author
  });

  if (!pictures) {
    throw createError(404, {
      details: "probably, there's not been added yet"
    });
  }

  res.json(pictures);
});

const getPicture = wrapAsync(async (req, res) => {
  const { pictureId: id } = req.params;

  try {
    const picture = await pictureService.getPicture(id);

    if (!picture) {
      throw createError(404);
    }

    res.json(picture);
  } catch (error) {
    if (error.statusCode) {
      throw createError(404, {
        message: "picture not found",
        details: "picture with this id not found, probably it's been removed"
      });
    }

    throw createError(400, {
      details: "you should provide valid id"
    });
  }
});

const removePicture = wrapAsync(async (req, res) => {
  const { pictureId: id } = req.params;
  const { user } = res.locals;
  const picture = await pictureService.findById(id);

  if (!picture) {
    throw createError(
      404,
      "there's no such picture, probably it has been removed"
    );
  }

  const imageManager = new ImageManager();

  const { isDeleted, isErr, err } = await imageManager.remove(picture);

  if (isErr) {
    throw createError(500, err);
  }

  if (isDeleted) {
    const deletedPicture = await pictureService.removePictureInDB(
      picture,
      user
    );

    res
      .status(200)
      .json({ message: "picture were removed!", picture: deletedPicture });
  }
});

const updatePicture = wrapAsync(async (req, res) => {
  const { pictureId: id } = req.params;
  const { name } = req.body;

  const data = { name };

  const result = await pictureService.updatePicture(id, data);

  if (!result) {
    throw createError(422, "can't update!");
  }

  res.status(200).json({ message: "picture were updated!" });
});

pictureRouter
  .route("/")
  .get(getPictures)
  .post(
    verify,
    findUser.byId,
    (req, res, next) => {
      upload(req, res, err => {
        if (err) {
          next(createError(400, "can't upload none image files"));
        } else {
          next();
        }
      });
    },
    createPicture
  );

pictureRouter.use(
  "/:pictureId",
  param("pictureId")
    .exists()
    .isMongoId(),
  hasValidationErr
);

pictureRouter
  .route("/:pictureId")
  .get(getPicture)
  .patch(verify, updatePicture)
  .delete(verify, findUser.byId, removePicture);

module.exports = pictureRouter;
exports.getPicture = getPicture;
