const userDir = require('@react-ssrex/utils').userDir;
const { createWriteStream, mkdirSync, readdirSync } = require("fs");

module.exports = async function uploadProfilePicture(root, { file }, { req: { user } }) {
  const userId = user._id;
  const { createReadStream, filename, mimetype, encoding } = await file;
  await userDir.addProfilePicture(userId.toString(), createReadStream(), filename);

  user.profilePicture = userDir.getProfilePictureUrl(userId.toString(), filename);
  await user.save();
  return user;
}
