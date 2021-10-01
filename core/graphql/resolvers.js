const types = require('./types');


const resolvers = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
  Subscription: require('./subscriptions'),
  ...types
};

module.exports = resolvers;
