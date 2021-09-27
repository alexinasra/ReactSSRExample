const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');
const User = require('@react-ssrex/database/models/User');
const Session = require('@react-ssrex/database/models/Session');
const jwt = require('jsonwebtoken');

module.exports = async function guestSignin(root, args , {
  ip,
  userAgentSource,
  user,
}) {
  if (user) {
    return {
      error: 'USER_SIGNEDIN',
    }
  }

  try {
    const session = await Session.create({
      ip,
      userAgent: userAgentSource,
    });

    const token = jwt.sign({
      sub: {
        isGuest: true,
        sessionId: session._id
      }
    }, 'TOP_SECRET', {
      expiresIn: '1d'
    });
    return {
      token
    };
  } catch (e) {
    return {
      error: 'ServerError',
    };
  }
}
