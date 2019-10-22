const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

exports.checkImageFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png|svg/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("can't upload, images only!");
  }
};

exports.createImageFileName = (
  { file, dateNow = Date.now(), width },
  options = {}
) => {
  const baseName = `${file.fieldname}-${dateNow}`;
  const ext = path.extname(file.originalname);

  if (options.temp) {
    `${baseName}-temp${ext}`;
  }

  if (width) {
    return `${baseName}-w${width}${ext}`;
  }

  return `${baseName}${ext}`;
};

exports.minifyAndResizeImages = async (tempPath, paths, { width }) => {
  try {
    const res = await sharp(tempPath)
      .jpeg({ quality: 85 })
      .toFile(paths[0]);

    await sharp(tempPath)
      .resize(width)
      .jpeg({ quality: 90 })
      .toFile(paths[1]);

    res && fs.unlinkSync(tempPath);
  } catch (error) {
    throw error;
  }
};
