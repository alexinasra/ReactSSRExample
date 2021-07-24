const { shield, rule, and, or, allow, deny } = require('graphql-shield');

const permissions = shield({
  Query: {
    users: allow,
    systemNotifications: allow,
    i18nNamespaces: allow,
    i18nTranslationKeys: allow,
    i18nTranslationValues: allow,
    i18nTranslationValue: allow,
  },
  Mutation: {
    createI18nNamespace: allow,
    dropI18nNamespace: allow,
    createI18nTranslation: allow,
    dropI18nTranslation: allow,
    updateI18nTranslation: allow,
    publishSystemNotification: allow,
  },
  Subscription: {
    newSystemNotification: allow,
  }
})

module.exports = permissions;
