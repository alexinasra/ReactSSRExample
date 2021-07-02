const { GraphQLUpload } = require('graphql-modules');
const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
  Subscription: {
    newNotification : {
      subscribe: (root, args, { pubSub }) => pubSub.asyncIterator('NEW_NOTIFICATION')
    }
  },
  Upload: GraphQLUpload,
  Notification: {
    id: (root) => root['_id'],
  },
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
  },
};

module.exports = resolvers;
