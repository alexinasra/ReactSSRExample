const { GraphQLUpload } = require('graphql-modules');
const mutations = require('./mutations');
const resolvers = {
  Query: {
    themeSettings: (root, args, { req }) => {
      if(req.user) {
        req.session.themeSettings = req.user.themeSettings;
      }
      if(!req.session.themeSettings) {
        req.session.themeSettings = {
          name: 'default',
          mode: 'light'
        };
      }
      return req.session.themeSettings;
    }
  },
  Mutation: {
    ...mutations,
  },
  Upload: GraphQLUpload,
  User: {
    id: (root) => root['_id'],

    preferedLanguage: (root, args, { req }) => {
      const language = root.preferedLanguage || req.i18n.languages[0];
      return language;
    },
    profilePicture: ({ profilePicture }, args, { req }) => {
      if(profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    },
    themeSettings: ({ themeSettings }) => {
      return themeSettings ? themeSettings : ({
        name: 'default',
        mode: 'light'
      })
    }
  }
};

module.exports = resolvers;
