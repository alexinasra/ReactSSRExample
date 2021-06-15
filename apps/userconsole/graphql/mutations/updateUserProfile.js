module.exports = async function updateUserProfile(root, { input }, { req, UsersDb }) {
  const userId = req.user._id;
  const user = await UsersDb.update(userId, {
    ...input
  });
  return user;
}
