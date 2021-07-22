const userDir = require('@react-ssrex/utils').userDir;
const User = require('@react-ssrex/database/models/User');
const Notification = require('@react-ssrex/database/models/Notification');
const jwt = require('jsonwebtoken');

module.exports = async function signup(root, { input: {
  email,
  password,
  firstname,
  lastname
} }, { req, pubSub }) {

  try {
    const user = new User();
    user.email = email;
    user.firstname = firstname;
    user.lastname = lastname;
    await user.setPassword(password);
    await user.save();
    await userDir.createHomeDir(user._id.toString());
    user.profilePicture = userDir.getProfilePictureUrl(user._id.toString(), 'default_profile_picture.png')
    await user.save();
    await (new Promise(function(resolve, reject) {
      req.login(user, (err)=> {
        if(err) return reject(err);
        resolve();
      });
    }));
    setTimeout(async () => {
      const notification = await Notification.create({
        publisher: 'system',
        message: `Welcome ${firstname} ${lastname}.`,
        for: [user._id],
      });

      pubSub.publish('NEW_NOTIFICATION', { notification });
    }, 3600);

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
    return { error: 'ServerError', }
  }
}
