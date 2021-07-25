const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest, isUser } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Query: {
    users: isUser,
    systemNotifications: isUser,
    i18nNamespaces: isUser,
    i18nTranslationKeys: isUser,
    i18nTranslationValues: isUser,
    i18nTranslationValue: isUser,
  },
  Mutation: {
    createI18nNamespace: isUser,
    dropI18nNamespace: isUser,
    createI18nTranslation: isUser,
    dropI18nTranslation: isUser,
    updateI18nTranslation: isUser,
    publishSystemNotification: isUser,
  },
  Subscription: {
    newSystemNotification: isUser,
  }
})

module.exports = permissions;
