const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");
const userDir = require('./user-dir');


module.exports = {
  Query: {

  },
  User: {
    profilePictures: async function (root, args, { req }) {
      try{
        const arr = await userDir.getProfilePictures(req.user.id);
        return arr.map(f => userDir.getProfilePictureUrl(req.user.id, f));
      } catch(error) {
        console.log(error);
        return [];
      }
    },
    preferedLanguage: (root, args, { req }) => {
      const language = root.preferedLanguage || req.i18n.languages[0];
      return language;
    },
  },
  Mutation: {
    updateProfilePicture: function(root, { url }, { req }) {
      return {...req.user, profilePicture: url };
    },
    uploadProfilePicture: async function (root, { file }, { req }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      await userDir.addProfilePicture(req.user.id, createReadStream(), filename);
      req.user.profilePicture= userDir.getProfilePictureUrl(req.user.id, filename);
      return req.user;
    },
    setPreferedLanguage: async function (root, { lng }, { req }) {
      req.user.preferedLanguage = lng;
      return req.user;
    },
  }
}
