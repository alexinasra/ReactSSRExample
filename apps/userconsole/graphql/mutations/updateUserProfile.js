module.exports = async function updateUserProfile(root, { input }, { req: { user } }) {
  user.set(input);
  await user.save();
  return user;
}
