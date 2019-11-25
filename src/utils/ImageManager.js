const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const mkdirpCallbacked = require("mkdirp");
const util = require("util");
const { map } = require("p-iteration");
const cloudinary = require("cloudinary");

const unlink = util.promisify(fs.unlink);
const mkdirp = util.promisify(mkdirpCallbacked);

const extractItemAndMakeAction = items => cb => {
  return items.map(item => cb(item));
};

const { API_KEY, API_SECRET, CLOUD_NAME } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET
});

const IN_PROD = process.env.NODE_ENV === "production";

class ImageManager {
  constructor(file, options = {}) {
    this.file = file;
    this.pictureId = options.id;
    this.cloudName = CLOUD_NAME;
    this.widths = options.widths;
    this.public = options.public;
    this.createImagePaths = extractItemAndMakeAction(this.widths);
  }

  async upload() {
    const result = IN_PROD
      ? await this.uploadPictureInProd()
      : await this.uploadPictureLocally();

    fs.unlinkSync(this.file.path);

    return result;
  }

  async remove(...args) {
    return IN_PROD
      ? await this.removePictureInProd(...args)
      : await this.removePictureLocally(...args);
  }

  async minifyAndResizeImages(tempPath, images) {
    try {
      const imagesInfo = await map(images, async image => {
        const { destination, width, filename } = image;

        await mkdirp(destination);

        const fullPath = path.resolve(destination, filename);

        const info = await sharp(tempPath)
          .resize(width)
          .jpeg({ quality: 85 })
          .toFile(fullPath);

        return info;
      });

      const hasImages = !!imagesInfo.length;

      return { isSuccess: hasImages };
    } catch (err) {
      return { isErr: true, err };
    }
  }

  async uploadPictureInProd() {
    const result = await cloudinary.v2.uploader.upload(this.file.path, {
      public_id: this.pictureId
    });

    if (!result) {
      return {
        isUploaded: false,
        message: "can not access to the cloudinary"
      };
    }

    const { public_id, version } = result;

    const imagePaths = this.createImagePaths(width => ({
      path: `https://res.cloudinary.com/${this.cloudName}/image/upload/f_auto,q_70,w_${width}/v${version}/${public_id}.webp`,
      width
    }));

    return { imagePaths, isUploaded: true };
  }

  async uploadPictureLocally() {
    const imagePaths = this.createImagePaths(width => {
      const widthFolder = `w_${width}`;

      const destination = path.resolve(
        __dirname,
        this.file.destination,
        widthFolder
      );

      return {
        path: `${this.public}/${widthFolder}/${this.pictureId}.jpeg`,
        filename: `${this.pictureId}.jpeg`,
        width,
        destination
      };
    });

    const tempPath = this.file.path;

    const imageManipulationResult = await this.minifyAndResizeImages(
      tempPath,
      imagePaths
    );

    if (!imageManipulationResult.isSuccess) {
      return { isUploaded: false };
    }

    return { imagePaths, isUploaded: true };
  }

  async removePictureLocally(picture) {
    const paths = picture.imagePaths.map(p => p.path);

    const publicDestination = path.join(__dirname, `../../client/public`);

    function joinMultiplePaths(toPath, paths) {
      return paths.map(p => path.join(toPath, p));
    }

    const imagePaths = joinMultiplePaths(publicDestination, paths);

    async function deleteFiles(paths) {
      try {
        const imagePathsRaw = await map(paths, async imagePath => {
          if (fs.existsSync(imagePath)) {
            await unlink(imagePath);
            return imagePath;
          }
        });

        const imagePaths = imagePathsRaw.filter(imagePath => !!imagePath);

        if (imagePaths < paths) {
          return {
            isDeleted: true,
            imagePaths,
            message: "part of files has already been removed"
          };
        }

        return { isDeleted: true, imagePaths };
      } catch (err) {
        return { isErr: true, err };
      }
    }

    return await deleteFiles(imagePaths);
  }

  async removePictureInProd(picture) {
    const response = await cloudinary.v2.uploader.destroy(picture._id);

    return { isDeleted: response.result === "ok" };
  }
}

module.exports = ImageManager;
