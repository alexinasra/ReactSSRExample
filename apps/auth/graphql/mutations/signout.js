

module.exports = async function signout(root, args, { req }) {
  if (!req.user) {
    return { error: 'UnauthenticatedUser' }
  }

  req.logout();
  if (req.session.themeSettings) {
    delete req.session.themeSettings
  }
  return { error: null }
}
