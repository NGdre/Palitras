const express = require("express");
const multer = require("multer");
const path = require("path");
const createError = require("http-errors");
const { param } = require("express-validator");

const { wrapAsync } = require("../../middlewares");
const { pictureService } = require("../../services");
const pictureRouter = express.Router();

const { hasValidationErr, verify, findUser } = require("../../middlewares/");

const {
  checkImageFileType,
  createImageFileName,
  minifyAndResizeImages
} = require("../../utils/helpers");

const destinationPath =
  process.env.NODE_ENV === "production"
    ? "client/build/uploads"
    : "client/public/uploads";

const destination = path.resolve(
  __dirname,
  `../../../${destinationPath}/images/`
);

const storage = multer.diskStorage({
  destination,
  filename: function(req, file, cb) {
    cb(null, createImageFileName({ file }, { temp: true }));
  }
});

const upload = multer({
  storage,
  limits: 2048 * 1024,
  fileFilter: function(req, file, cb) {
    checkImageFileType(file, cb);
  }
}).single("picture");

const createPicture = wrapAsync(async (req, res) => {
  await upload(req, res, async err => {
    if (err) {
      throw createError(400, {
        message: err,
        details: "you can only upload pictures"
      });
    }

    const { user } = res.locals;
    const { file } = req;

    const dateNow = Date.now();
    const width = 450;

    const smallImageBaseName = createImageFileName({ file, dateNow, width });
    const imageBaseName = createImageFileName({ file, dateNow });

    const public = "/uploads/images/";
    const data = {
      name: req.body.name,
      author: user,
      imagePaths: [
        {
          path: `${public}${imageBaseName}`
        },
        {
          path: `${public}${smallImageBaseName}`,
          width
        }
      ]
    };

    const smallPath = path.resolve(req.file.destination, smallImageBaseName);
    const imagePath = path.resolve(req.file.destination, imageBaseName);

    minifyAndResizeImages(req.file.path, [imagePath, smallPath], { width });

    const picture = await pictureService.addPicture(data);

    if (!picture) {
      throw createError(400, {
        message: "can't upload"
      });
    }

    res.status(201).json({ message: "image successfuly uploaded!" });
  });
});

const getPictures = wrapAsync(async (req, res) => {
  const { include, exclude, sort } = req.query;

  const fields = include || exclude;
  const isInclude = Boolean(include);

  const pictures = await pictureService.getPictures({
    sort,
    selection: {
      fields,
      isInclude
    }
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

  const result = await pictureService.removePicture(id, user);

  if (!result) {
    throw createError(400, "picture has already been removed!");
  }

  res.status(204).json({ message: "picture were removed!" });
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
  .post(verify, findUser.byId, createPicture);

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
