
module.exports = async function signup(root, { input }, { req, UsersDb, generateId }) {
  const userId = generateId();
  try {
    //create home directory
    await userDir.createHomeDir(userId.toString());
  } catch (e) {
    return { error: STATUS_CODE.ServerError, }
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
    return { user };
  } catch (e) {
    // TODO: check for other errors.
    return { error: 'ServerError', }
  }
}
