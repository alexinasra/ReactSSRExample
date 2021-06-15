
const userDir =  require('@react-ssrex/userconsole/graphql/user-dir');

const resolvers = {
  Query: require('./queries'),
  Mutation: require('./mutations'),
};

module.exports = resolvers;
