const userDir = require('@react-ssrex/utils').userDir;
const { createWriteStream, mkdirSync, readdirSync } = require("fs");

module.exports = async function uploadProfilePicture(root, { file }, { req, UsersDb }) {
  const userId = req.user._id;
  const { createReadStream, filename, mimetype, encoding } = await file;
  await userDir.addProfilePicture(userId.toString(), createReadStream(), filename);
  const user = await UsersDb.update(userId.toString(), {
    profilePicture: userDir.getProfilePictureUrl(userId.toString(), filename)
  })
  return user;
}
