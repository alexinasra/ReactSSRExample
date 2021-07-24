const { shield, rule, and, or, allow, deny } = require('graphql-shield');

const permissions = shield({
  Query: {
    userInRole: allow,
  },
  Mutation: {
    signup: allow,
    signin: allow,
    signout: allow,
    changePassword: allow,
  }
})

module.exports = permissions;
