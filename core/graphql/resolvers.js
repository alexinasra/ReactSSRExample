const { GraphQLUpload } = require('graphql-modules');


const resolvers = {
  Query: {
    application: () => ({ name: 'Lookfor Emirates' }),
  },
  Upload: GraphQLUpload,
  User: {
    profilePicture: function ({ profilePicture }, args, { req }) {
      if(profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    }
  }
};

module.exports = resolvers;
