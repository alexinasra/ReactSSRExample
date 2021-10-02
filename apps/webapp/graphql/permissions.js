const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest, isUser } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    _webapp: deny
  },
  Mutation: {
    voteOnPoll: isUser
  }
});

module.exports = permissions;
