const { shield, rule, not, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    userInRole: allow,
  },
  Mutation: {
    signup: isGuest,
    signin: isGuest,
    signout: isAuthenticated,
    changePassword: isAuthenticated,
  }
})

module.exports = permissions;
