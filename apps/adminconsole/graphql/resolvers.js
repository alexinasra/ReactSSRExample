const {
  withFilter
} = require('graphql-subscriptions');

module.exports = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
  Subscription: {
    newSystemNotification: {
      resolve: ({ notification }) => notification,
      subscribe: (root, args, ctx) => withFilter(
        () => ctx.pubSub.asyncIterator(['NEW_NOTIFICATION']),
        ({ notification }) => notification.publisher === 'system'
      )(root, args, ctx)
    }
  }
};
