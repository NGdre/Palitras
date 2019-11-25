const path = require("path");

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
  { file, dateNow = Date.now() },
  options = {}
) => {
  const baseName = `${file.fieldname}-${dateNow}`;
  const ext = path.extname(file.originalname);

  if (options.temp) {
    return `${baseName}-temp${ext}`;
  }

  return `${baseName}${ext}`;
};
