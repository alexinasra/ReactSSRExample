const { LoggerPubSub } = require('@react-ssrex/utils').logger;

module.exports = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
  Subscription: {
    incommingLog: {
      subscribe: () => LoggerPubSub.asyncIterator(['LOG_EVENT']),
    }
  },
};
