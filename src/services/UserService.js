const bcrypt = require("bcrypt");
const Joi = require("joi");
const userValidation = require("../utils/userValidation");
const createError = require("../utils/createError");
const emailService = require("./EmailService");

class UserService {
  constructor(User, Token) {
    this.User = User;
    this.Token = Token;
  }

  validate(data) {
    return Joi.validate(data, userValidation, err => {
      if (err) {
        throw createError(422, {
          message: "email and password must correspond with the schema"
        });
      } else return data;
    });
  }

  async encrypt(password) {
    const saltRounds = await bcrypt.genSalt();
    return bcrypt.hash(password, saltRounds);
  }

  compare(password, hash) {
    return bcrypt.compare(password, hash);
  }

  saveUserWith(email, hash) {
    const user = this.User.create({ email, hash });
    return user;
  }

  createTokenFor(user) {
    const token = user.generateToken();

    token.save(err => {
      if (err) {
        throw err;
      } else {
        emailService.sendConfirmation(user, token).catch(() => {
          throw createError(503, {
            message: "it can not send email rigth now, please try later"
          });
        });
      }
    });
  }

  createResetTokenFor(user) {
    const token = user.generateToken();

    token.save(err => {
      if (err) {
        throw err;
      } else {
        emailService.sendResetPassword(user, token).catch(() => {
          throw createError(503, {
            message: "it can not send email rigth now, please try later"
          });
        });
      }
    });
  }

  async findToken(token) {
    const foundToken = await this.Token.findOne({ value: token }).exec();

    if (!foundToken) {
      throw createError(
        422,
        "We were unable to find a valid token. Your token my have expired.",
        true
      );
    }
    return foundToken;
  }

  async verifyUser(id) {
    let foundUser = await this.findUserBy(id);

    if (!foundUser) {
      throw createError(
        422,
        "We were unable to find a user for this token",
        true
      );
    }
    if (foundUser.isVerified) {
      throw createError(422, "This user has already been verified.", true);
    }
    foundUser.isVerified = true;
    foundUser = await this.saveUser(foundUser);

    return foundUser;
  }

  async findUserBy(id) {
    return await this.User.findOne({ _id: id }).exec();
  }

  async getUserInfo(id) {
    return await this.User.findOne({ _id: id }).select(
      "isVerified _id email username pictures amountOfPictures favorites"
    );
  }

  async getFavorites(id) {
    const currentUser = await this.User.findById(id)
      .populate("favorites", "_id name author imagePaths")
      .populate({
        path: "favorites",
        populate: { path: "author", select: "username email" }
      });

    return currentUser.favorites || [];
  }

  async getMyPictures(id) {
    const currentUser = await this.User.findById(id).populate(
      "pictures",
      "_id name author imagePaths"
    );

    return currentUser.pictures || [];
  }

  async getUsers() {
    return await this.User.find({}).select("isVerified _id email username");
  }

  async saveUser(user) {
    return await user.save();
  }

  async updateUser(data, user) {
    for (let propName in data) {
      user[propName] = data[propName];
    }
    console.log(user);

    return await this.saveUser(user);
  }

  removeUser(user) {
    this.User.deleteOne({ _id: user.id }, (err, user) => {
      console.log(user);
    });
  }

  removeToken(token) {
    this.Token.deleteOne({ _id: token._id }, (err, token) => {
      console.log(token);
    });
  }
}

module.exports = UserService;
