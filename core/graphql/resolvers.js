const User = require('@react-ssrex/database/models/User');
const NotificationRecipient = require('@react-ssrex/database/models/NotificationRecipient');
const Notification = require('@react-ssrex/database/models/Notification');


const {
  GraphQLUpload
} = require('graphql-modules');
const {
  GraphQLScalarType,
  Kind
} = require('graphql');
const {
  withFilter
} = require('graphql-subscriptions');

const resolvers = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
  Subscription: {
    newNotification: {
      subscribe: (root, args, ctx) => withFilter(
        () => ctx.pubSub.asyncIterator('NEW_NOTIFICATION'),
        ({
          newNotification
        }) => newNotification.for.find(id => ctx.req.user._id.equals(id)) !== undefined
      )(root, args, ctx)
    }
  },
  Upload: GraphQLUpload,
  Notification: {
    id: (root) => root['_id'],
    checked: async (root, args, {
      req,
      mongoDatabase,
      UsersDb,
      ...rest
    }) => {
      if (!req.user) {
        return false
      }

      const result = await NotificationRecipient.findOne().isChecked(req.user._id, root._id)
      return !!result;
    }
  },
  User: {
    id: (root) => root['_id'],

    preferedLanguage: (root, args, {
      req
    }) => {
      const language = root.preferedLanguage || req.i18n.languages[0];
      return language;
    },
    profilePicture: ({
      profilePicture
    }, args, {
      req
    }) => {
      if (profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    },
    themeSettings: ({
      themeSettings
    }) => {
      return themeSettings || ({
        name: 'default',
        mode: 'light'
      });
    }
  },
};

module.exports = resolvers;
