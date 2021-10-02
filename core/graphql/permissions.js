const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest, isUser } = require('./rules');

const permissions = shield({
  Query: {
    application: deny,
    themeSettings: isAuthenticated,
    notifications: isUser,
    allPolls: isAuthenticated,
    getPoll: isAuthenticated
  },
  Mutation: {
    setThemeName: isAuthenticated,
    setThemeMode: isAuthenticated,
    toggleThemeMode: isAuthenticated,
    checkNotifications: isUser,
    createPoll: isUser,
  },
  Subscription: {
    newNotification: isUser,
  }
})

module.exports = permissions;
