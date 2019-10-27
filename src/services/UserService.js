const bcrypt = require("bcrypt");
const Joi = require("joi");
const userValidation = require("../utils/userValidation");
const createError = require("http-errors");
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
        "We were unable to find a valid token. Your token my have expired."
      );
    }
    return foundToken;
  }

  async verifyUser(id) {
    let foundUser = await this.findUserBy(id);

    if (!foundUser) {
      throw createError(422, "We were unable to find a user for this token");
    }
    if (foundUser.isVerified) {
      throw createError(422, "This user has already been verified.");
    }
    foundUser.isVerified = true;
    foundUser = await this.saveUser(foundUser);

    return foundUser;
  }

  async findUserBy(id) {
    return await this.User.findById(id);
  }

  async findUserByEmail(email) {
    return await this.User.findOne({ email });
  }

  async getUserInfo(id) {
    return await this.User.findById(id).select(
      "isVerified  email username pictures amountOfPictures avatar favorites"
    );
  }

  async getUser(id) {
    return await this.User.findById(id).select(
      "email username amountOfPictures avatar about"
    );
  }

  async getFavorites(id) {
    const currentUser = await this.User.findById(id)
      .populate("favorites", "name author imagePaths")
      .populate({
        path: "favorites",
        populate: { path: "author", select: "username email" }
      });

    return currentUser.favorites || [];
  }

  async getMyPictures(id) {
    const currentUser = await this.User.findById(id).populate(
      "pictures",
      "name author imagePaths"
    );

    return currentUser.pictures || [];
  }

  async getUsers() {
    return await this.User.find({}).select("isVerified email username");
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
