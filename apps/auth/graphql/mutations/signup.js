const userDir = require('@react-ssrex/utils').userDir;
const jwt = require('jsonwebtoken');

module.exports = async function signup(root, { input }, { req, UsersDb, generateId }) {
  const userId = generateId();
  try {
    //create home directory
    await userDir.createHomeDir(userId.toString());
  } catch (e) {
    console.log(e);
    return { error: 'ServerError', }
  }

  const userData = {
    firstname: input.firstname,
    lastname: input.lastname,
    _id: userId,
    profilePicture: userDir.getProfilePictureUrl(userId.toString(), 'default_profile_picture.png'),
  }

  try {
    const user = await UsersDb.create(userData, input.email, input.password);
    await UsersDb.login(input.email, input.password)
    await (new Promise(function(resolve, reject) {
      req.login(user, (err)=> {
        if(err) return reject(err);
        resolve();
      });
    }));

    const token = jwt.sign({
      name: `${user.firstname} ${user.lastname}`,
      given_name: user.firstname,
      family_name: user.lastname,
      picture: user.profilePicture,
      email: user.email,
      sub: { userId: user._id }
    }, 'TOP_SECRET', { expiresIn: '1y' });
    return { user, token };
  } catch (e) {
    console.log(e);
    // TODO: check for other errors.
    return { error: 'ServerError', }
  }
}
