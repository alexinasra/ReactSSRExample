const { shield, rule, not, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest, isUser } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    userInRole: allow,
  },
  Mutation: {
    signup: isGuest,
    signin: isGuest,
    guestSignin: not(isAuthenticated),
    signout: isUser,
    changePassword: isUser,
  }
})

module.exports = permissions;
