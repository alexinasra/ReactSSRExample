const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');
const userDir = require('./user-dir');


module.exports = {
  User: {
    profilePictures: async function (root, args, { req }) {
      const userId = req.user._id;

      try {
        const arr = await userDir.getProfilePictures(userId.toString());
        return arr.map(f => userDir.getProfilePictureUrl(userId.toString(), f));
      } catch(error) {
        console.log(error);
        return [];
      }
    },
  },
  Mutation: require('./mutations'),
}
