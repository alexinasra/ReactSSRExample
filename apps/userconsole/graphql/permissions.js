const { shield, rule, and, or, allow, deny } = require('graphql-shield');
const { isAuthenticated, isGuest, isUser } = require('@react-ssrex/graphql/rules');

const permissions = shield({
  Mutation: {
    uploadProfilePicture: isUser,
    updateProfilePicture: isUser,
    setPreferedLanguage: isUser,
    updateUserProfile: isUser,
  }
})

module.exports = permissions;
