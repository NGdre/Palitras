const { Schema, model } = require("mongoose");
const crypto = require("crypto");
const Token = require("./Token");

const userSchema = new Schema(
  {
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true
    },
    hash: {
      type: String,
      required: true
    },
    username: String,
    avatar: String,
    amountOfPictures: {
      type: Number,
      default: 0
    },
    pictures: [
      {
        type: Schema.Types.ObjectId,
        ref: "Picture"
      }
    ],
    favorites: [
      {
        type: Schema.Types.ObjectId,
        ref: "Picture"
      }
    ],
    gender: String,
    firstname: String,
    lastname: String,
    dateOfTheBirth: {
      type: Date
    },
    city: String,
    country: String,
    about: String,
    isOnline: {
      type: Boolean
    },
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

class UserClass {
  generateConfirmationUrl(token) {
    return `${process.env.WEBSITE}/confirmation/${token}`;
  }

  generateResetPasswordUrl(token) {
    return `${process.env.WEBSITE}/reset-password/${token}`;
  }

  generateToken() {
    return new Token({
      _userId: this._id,
      value: crypto.randomBytes(16).toString("hex")
    });
  }

  async addPicture(pictureId) {
    this.pictures.push(pictureId);
    this.amountOfPictures = this.pictures.length;
    await this.save();
    return true;
  }

  async addFavorite(pictureId) {
    this.favorites.push(pictureId);
    await this.save();
    return true;
  }

  async removeFavorite(pictureId) {
    const index = this.favorites.indexOf(pictureId);
    if (index > -1) {
      this.favorites.splice(index, 1);
      await this.save();
      return true;
    }
    return false;
  }

  async removeMyPicture(pictureId) {
    const index = this.pictures.indexOf(pictureId);

    if (index > -1) {
      this.pictures.splice(index, 1);
      this.amountOfPictures = this.pictures.length;
      console.log(this);
      await this.save();
      return true;
    }
    return false;
  }
}

userSchema.loadClass(UserClass);

module.exports = model("User", userSchema);
