const { Schema, model } = require("mongoose");

const pictureSchema = new Schema(
  {
    name: {
      type: String,
      lowercase: true,
      required: true
    },
    author: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    imagePaths: [
      {
        path: {
          type: String,
          required: true
        },
        width: Number
      }
    ],
    favAmount: { type: Number, default: 0 },
    favUsers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

class PictureClass {
  async addFavorite(userId) {
    const userhasNotLiked = !this.hasUser(userId);

    if (userhasNotLiked) {
      this.favUsers.push(userId);
      this.favAmount = this.favUsers.length;
      await this.save();
      return true;
    }

    return false;
  }

  async removeFavorite(userId) {
    const userhasLiked = this.hasUser(userId);
    const index = this.favUsers.indexOf(userId);

    if (userhasLiked && index > -1) {
      this.favUsers.splice(index, 1);
      this.favAmount = this.favUsers.length;

      await this.save();
      return true;
    }

    return false;
  }

  hasUser(userId) {
    return !!this.favUsers.find(user => user._id.equals(userId));
  }
}

pictureSchema.loadClass(PictureClass);

module.exports = model("Picture", pictureSchema);
