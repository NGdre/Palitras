const fs = require("fs");
const path = require("path");

const publicPath =
  process.env.NODE_ENV === "production" ? "client/build" : "client/public";

const publicDestination = path.resolve(__dirname, `../../${publicPath}`);

class PictureService {
  constructor(Picture, User) {
    this.Picture = Picture;
    this.User = User;
  }

  async findById(id) {
    return await this.Picture.findById(id).exec();
  }

  async getPictures() {
    return await this.Picture.find({})
      .populate("author", "username email")
      .select("_id name author imagePath image");
  }

  async getPicture(id) {
    return await this.Picture.findById(id)
      .populate("author", "email username avatar amountOfPictures")
      .select("_id name author imagePath createdAt favAmount favUsers");
  }

  async findUserById(userId) {
    return await this.User.findById(userId).exec();
  }

  async addPicture(data) {
    const user = await this.findUserById(data.author);

    if (user) {
      const picture = await this.savePicture(data);
      const isPictureWasAdded = user.addPicture(picture._id);
      return isPictureWasAdded && picture;
    }

    return false;
  }

  async savePicture(data) {
    return await this.Picture.create(data);
  }

  async updatePicture(id, data) {
    return await this.Picture.findByIdAndUpdate(id, data);
  }

  async removePicture(id, user) {
    const picture = await this.findById(id);

    const imagePath =
      picture && path.join(publicDestination, `/${picture.imagePath}`);

    fs.unlink(imagePath, async err => {
      if (err) {
        return false;
      }
      const deleted = await user.removeMyPicture(id);
      deleted && (await picture.remove());
    });

    return true;
  }

  async addInFavorites(id, user) {
    const picture = await this.findById(id);

    let updated = await picture.addFavorite(user.id);

    updated = updated && (await user.addFavorite(id));

    return { picture, updated };
  }

  async removeFromFavorites(id, user) {
    const picture = await this.findById(id);

    let updated = await picture.removeFavorite(user.id);

    updated = updated && (await user.removeFavorite(id));

    return { picture, updated };
  }
}

module.exports = PictureService;
