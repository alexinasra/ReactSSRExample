const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');
const User = require('@react-ssrex/database/models/User');
const Session = require('@react-ssrex/database/models/Session');
const jwt = require('jsonwebtoken');

module.exports = async function signin(root, { input: { email, password } }, {
  session, //if session contains something like basket items move them to user session.
  req,
  ip,
  userAgentSource,
  res
}) {
  try {
    const user = await User.emailSignin(email, password);

    let userSession = await Session.findOne({
      userId: user._id,
      ip,
      userAgent: userAgentSource,
    }).exec();

    if (!userSession) {
      userSession = await Session.create({
        userId: user._id,
        ip,
        userAgent: userAgentSource,
      });
    }

    await (new Promise(function(resolve, reject) {
      req.login(user, (err)=> {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    }));

    const token = jwt.sign({
      name: `${user.firstname} ${user.lastname}`,
      given_name: user.firstname,
      family_name: user.lastname,
      picture: user.profilePicture,
      email: user.email,
      sub: {
        userId: user._id,
        sessionId: userSession._id,
      }
    }, 'TOP_SECRET', { expiresIn: '1y' });

    return {
      user,
      token
    };
  } catch (e) {
    if (e instanceof DbLoginUserNotFoundError) {
      return {
        error: 'UserNotFound'
      };
    } else if (e instanceof DbLoginBadPasswordError) {
      return {
        error: 'IncorrectPassword'
      };
    } else  {
      return {
        error: 'ServerError',
      };
    }
  }
}
