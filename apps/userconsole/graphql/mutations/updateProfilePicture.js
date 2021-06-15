
module.exports = async function updateProfilePicture(root, { url }, { req, UsersDb }) {

  const userId = req.user._id;
  const user = await UsersDb.update(userId, {
    profilePicture: url
  })
  return user;
}
