const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');
const userDir = require('./user-dir');


module.exports = {
  Query: {

  },
  User: {
    profilePictures: async function (root, args, { req }) {
      const userId = req.user._id;

      try {
        const arr = await userDir.getProfilePictures(userId);
        return arr.map(f => userDir.getProfilePictureUrl(userId, f));
      } catch(error) {
        console.log(error);
        return [];
      }
    },
  },
  Mutation: {
    updateProfilePicture: async (root, { url }, { req, UsersDb, generateId }) => {

      const userId = req.user._id;
      const user = await UsersDb.update(generateId(userId), {
        profilePicture: url
      })
      return user;
    },
    uploadProfilePicture: async function (root, { file }, { req, UsersDb, generateId }) {
      const userId = req.user._id;
      const { createReadStream, filename, mimetype, encoding } = await file;
      await userDir.addProfilePicture(userId, createReadStream(), filename);
      const user = await UsersDb.update(generateId(userId), {
        profilePicture: userDir.getProfilePictureUrl(userId, filename)
      })
      return user;
    },
    setPreferedLanguage: async function (root, { lng }, { req, UsersDb, generateId }) {
      const userId = req.user._id;
      const user = await UsersDb.update(generateId(userId), {
        preferedLanguage: lng
      });
      return user;
    },
    updateUserProfile: async function (root, { input }, { req, UsersDb, generateId }) {
      const userId = req.user._id;
      const user = await UsersDb.update(generateId(userId), {
        ...input
      });
      return user;
    }
  }
}
