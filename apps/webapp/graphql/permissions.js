const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    _webapp: deny
  },
  Mutation: {
    voteOnPoll: isAuthenticated
  }
});

module.exports = permissions;
