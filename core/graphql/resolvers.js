const { GraphQLUpload } = require('graphql-modules');


const resolvers = {
  Query: {
    application: () => ({ name: 'Lookfor Emirates' }),
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
    }
  }
};

module.exports = resolvers;
