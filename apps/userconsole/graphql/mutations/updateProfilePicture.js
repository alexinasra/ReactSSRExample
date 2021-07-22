
module.exports = async function updateProfilePicture(root, { url }, { req: { user } }) {
  user.profilePicture = url;
  await user.save();
  return user;
}
