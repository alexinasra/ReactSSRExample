

module.exports = async function signout(root, args, { req }) {
  if (!req.user) {
    return { error: 'UnauthenticatedUser' }
  }

  req.logout();
  return { error: null }
}
