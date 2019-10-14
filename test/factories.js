const email = "a@m.ru";
const password = "pass";
const hash = "somehash";
const pictureName = "picture";
const imagePath = "/uploads/images/image.jpg";

module.exports.validPictureData = author => ({
  name: pictureName,
  imagePath,
  author
});

module.exports.invalidPictureData = () => ({
  name: pictureName,
  imagePath
});

module.exports.validUserData = () => ({
  email,
  hash
});

module.exports.expectedValidPictureProps = () => ({
  favAmount: 0,
  favUsers: [],
  name: pictureName,
  imagePath
});

module.exports.expectedValidUserProps = () => ({
  amountOfPictures: 0,
  pictures: [],
  isVerified: false,
  email,
  hash
});
