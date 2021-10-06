const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest } = require('./rules');

const permissions = shield({
  Query: {
    application: deny,
    notifications: isAuthenticated,
    allPolls: allow,
    getPoll: allow
  },
  Mutation: {
    checkNotifications: isAuthenticated,
    createPoll: isAuthenticated,
  },
  Subscription: {
    newNotification: isAuthenticated,
  }
})

module.exports = permissions;
