const { shield, rule, and, or, allow, deny } = require('graphql-shield');

const permissions = shield({
  Mutation: {
    uploadProfilePicture: allow,
    updateProfilePicture: allow,
    setPreferedLanguage: allow,
    updateUserProfile: allow,
  }
})

module.exports = permissions;
