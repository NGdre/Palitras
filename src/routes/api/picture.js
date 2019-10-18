const express = require("express");
const pictureRouter = express.Router();

const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const { pictureService } = require("../../services");

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
    checkFileType(file, cb);
  }
}).single("picture");

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|svg/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("can't upload, images only!");
  }
}

function createImageFileName(
  { file, dateNow = Date.now(), width },
  options = {}
) {
  const baseName = `${file.fieldname}-${dateNow}`;
  const ext = path.extname(file.originalname);

  if (options.temp) {
    `${baseName}-temp${ext}`;
  }

  if (width) {
    return `${baseName}-w${width}${ext}`;
  }

  return `${baseName}${ext}`;
}

pictureRouter.post("/upload-picture", (req, res) => {
  upload(req, res, async err => {
    if (err) {
      res.json(err);
    } else {
      const { user } = res.locals;
      const { file } = req;

      const dateNow = Date.now();
      const width = 450;

      const smallImageBaseName = createImageFileName({ file, dateNow, width });
      const imageBaseName = createImageFileName({ file, dateNow });

      const smallPath = path.resolve(req.file.destination, smallImageBaseName);
      const imagePath = path.resolve(req.file.destination, imageBaseName);

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

      try {
        await sharp(req.file.path)
          .resize(width)
          .jpeg({ quality: 90 })
          .toFile(smallPath);

        const res = await sharp(req.file.path)
          .jpeg({ quality: 85 })
          .toFile(imagePath);

        res && fs.unlinkSync(req.file.path);
      } catch (error) {
        console.log(error);
      }

      const picture = await pictureService.addPicture(data);

      const message = picture
        ? { message: "image successfuly uploaded!" }
        : { message: "can't upload" };

      res.json(message);
    }
  });
});

pictureRouter.get("/get-pictures", async (req, res) => {
  const pictures = await pictureService.getPictures();
  res.json(pictures);
});

pictureRouter.get("/get-picture/:id", async (req, res) => {
  const { id } = req.params;
  const picture = await pictureService.getPicture(id);
  res.json(picture);
});

pictureRouter.delete("/remove-picture/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  const result = await pictureService.removePicture(id, user);

  const message = result
    ? "picture were removed!"
    : "picture has already been removed!";

  res.json({ message });
});

pictureRouter.patch("/update-picture/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = { name };

  const result = await pictureService.updatePicture(id, data);

  const message = result ? "picture were updated!" : "can't update!";

  res.json({ message });
});

pictureRouter.patch("/add-favorite/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  const result = await pictureService.addInFavorites(id, user);

  const message = result.updated
    ? "picture were added in favorites!"
    : "picture has already been added!";

  res.json({ message });
});

pictureRouter.patch("/remove-favorite/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  const result = await pictureService.removeFromFavorites(id, user);

  const message = result.updated
    ? "picture were removed from favorites!"
    : "picture has already been removed!";

  res.json({ message });
});

module.exports = pictureRouter;
