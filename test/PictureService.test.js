const { expect } = require("chai");

const {
  validPictureData,
  validUserData,
  invalidPictureData,
  expectedValidPictureProps,
  expectedValidUserProps
} = require("./factories");

const { pictureService } = require("../src/services/");
const Picture = require("../src/models/Picture");
const User = require("../src/models/User");
const mongoose = require("mongoose");
const sinon = require("sinon");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false
};

before(done => {
  mongoServer = new MongoMemoryServer();
  mongoServer
    .getConnectionString()
    .then(mongoUri => {
      return mongoose.connect(mongoUri, opts, err => {
        if (err) done(err);
      });
    })
    .then(() => done());
});

after(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("PictureService", () => {
  let author;
  beforeEach(() => {
    const user = new User(validUserData());
    author = user.id;
    user.save();
  });

  afterEach(async () => {
    await User.deleteMany({});
    await Picture.deleteMany({});
  });

  describe("addPicture", async () => {
    beforeEach(() => {
      sinon.spy(pictureService, "findUserById");
      sinon.spy(pictureService, "savePicture");
    });

    afterEach(() => {
      pictureService.findUserById.restore();
      pictureService.savePicture.restore();
    });

    it("should add picture with given author", async () => {
      await pictureService.addPicture(validPictureData(author));

      expect(pictureService.findUserById.calledOnce).true;
      expect(pictureService.savePicture.calledOnce).true;
      expect(await Picture.countDocuments()).to.be.equal(1);
    });

    it("should return false if there's no such author", async () => {
      const picture = await pictureService.addPicture(invalidPictureData());

      expect(pictureService.savePicture.called).false;
      expect(picture).to.be.false;
      expect(await Picture.countDocuments()).to.be.equal(0);
    });
  });

  describe("findUserById", () => {
    it("should find and return user by id", async () => {
      const user = await pictureService.findUserById(author);

      expect(user).to.deep.include(expectedValidUserProps());
      expect(user._id.equals(author)).to.be.true;
    });

    it("if does not find, return null", async () => {
      const user = await pictureService.findUserById(
        new mongoose.Types.ObjectId()
      );
      expect(user).to.be.null;
    });
  });

  describe("savePicture", () => {
    it("should return picture, if to pass valid data", async () => {
      const picture = await pictureService.savePicture(
        validPictureData(author)
      );
      expect(picture).to.deep.include(expectedValidPictureProps());
      expect(picture.author.equals(author)).to.be.true;
    });
  });

  describe("addInFavorites", () => {
    let picture, user;

    beforeEach(async () => {
      user = new User(validUserData());
      await user.save();

      picture = new Picture(validPictureData(user.id));
      await picture.save();

      sinon.spy(pictureService, "findById");
    });

    afterEach(() => {
      pictureService.findById.restore();
    });

    it("should update favAmout, if such user has't add in favorites", async () => {
      const updatedPicture = await pictureService.addInFavorites(
        picture.id,
        user
      );

      expect(updatedPicture.picture.favAmount).to.equal(1);
      expect(updatedPicture.picture.favUsers.length).to.equal(1);
      expect(updatedPicture.updated).to.be.true;
      expect(pictureService.findById.calledOnce).true;
    });

    it("shouldn't update favAmout, if such user has already add in favorites", async () => {
      await pictureService.addInFavorites(picture.id, user);
      await pictureService.addInFavorites(picture.id, user);
      await pictureService.addInFavorites(picture.id, user);

      const updatedPicture = await pictureService.addInFavorites(
        picture.id,
        user
      );

      expect(pictureService.findById.called).true;
      expect(updatedPicture.updated).to.be.false;
    });
  });
});
