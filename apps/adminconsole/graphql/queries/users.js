
module.exports = async function i18nNamespaces (root, args, { req, UsersDb }) {
  return UsersDb.getUsers();
}
