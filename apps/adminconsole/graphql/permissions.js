const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    users: isAuthenticated,
    systemNotifications: isAuthenticated,
    i18nNamespaces: isAuthenticated,
    i18nTranslationKeys: isAuthenticated,
    i18nTranslationValues: isAuthenticated,
    i18nTranslationValue: isAuthenticated,
  },
  Mutation: {
    createI18nNamespace: isAuthenticated,
    dropI18nNamespace: isAuthenticated,
    createI18nTranslation: isAuthenticated,
    dropI18nTranslation: isAuthenticated,
    updateI18nTranslation: isAuthenticated,
    publishSystemNotification: isAuthenticated,
  },
  Subscription: {
    newSystemNotification: isAuthenticated,
  }
})

module.exports = permissions;
