const { shield, rule, and, or, allow, deny } = require('graphql-shield');
console.log(allow);
const permissions = shield({
  Query: {
    application: allow,
    themeSettings: allow,
    notifications: allow
  },
  Mutation: {
    setThemeName: allow,
    setThemeMode: allow,
    toggleThemeMode: allow,
    checkNotifications: allow,
  },
  Subscription: {
    newNotification: allow,
  }
})

module.exports = permissions;
