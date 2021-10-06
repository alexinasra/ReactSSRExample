const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Mutation: {
    uploadProfilePicture: isAuthenticated,
    updateProfilePicture: isAuthenticated,
    setPreferedLanguage: isAuthenticated,
    updateUserProfile: isAuthenticated,
  }
})

module.exports = permissions;
