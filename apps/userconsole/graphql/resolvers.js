const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");
const UsersDb = require('@react-ssrex/database/UsersDb');

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');
const userDir = require('./user-dir');


module.exports = {
  Query: {

  },
  User: {
    profilePictures: async function (root, args, { req }) {
      const userId = req.session.userInRole._id;

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
    updateProfilePicture: async (root, { url }, { req, mongoClient, generateId }) => {
      const database = await mongoClient.db(MongoDbConfig.db)

      const userId = req.session.userInRole._id;
      const user = await UsersDb.with(database).update(generateId(userId), {
        profilePicture: url
      })
      return user;
    },
    uploadProfilePicture: async function (root, { file }, { req, mongoClient, generateId }) {
      const database = await mongoClient.db(MongoDbConfig.db)
      const userId = req.session.userInRole._id;
      const { createReadStream, filename, mimetype, encoding } = await file;
      await userDir.addProfilePicture(userId, createReadStream(), filename);
      console.log(req.session)
      const user = await UsersDb.with(database).update(generateId(userId), {
        profilePicture: userDir.getProfilePictureUrl(userId, filename)
      })
      return user;
    },
    setPreferedLanguage: async function (root, { lng }, { req, mongoClient, generateId }) {
      const database = await mongoClient.db(MongoDbConfig.db)
      const userId = req.session.userInRole._id;
      const user = await UsersDb.with(database).update(generateId(userId), {
        preferedLanguage: lng
      });
      return user;
    },
    updateUserProfile: async function (root, { input }, { req, mongoClient, generateId }) {
      const database = await mongoClient.db(MongoDbConfig.db)
      const userId = req.session.userInRole._id;
      const user = await UsersDb.with(database).update(generateId(userId), {
        ...input
      });
      return user;
    }
  }
}
