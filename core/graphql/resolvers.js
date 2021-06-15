const { GraphQLUpload } = require('graphql-modules');
const resolvers = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
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
      return themeSettings || ({
        name: 'default',
        mode: 'light'
      })
    }
  }
};

module.exports = resolvers;
