const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');

module.exports = async function changePassword(root, { input: { oldPassword, newPassword } }, { req, UsersDb, generateId }) {
  if (!req.user) {
    return { error: 'UnauthenticatedUser' };
  }

  try {
    const result = await UsersDb.changePassword(req.user._id, oldPassword, newPassword);

    return {
      error : null
    };
  } catch (e) {
    console.log(e);
    if (e instanceof DbChangePasswordUserNotFoundError) {

      return {
        error: 'UserNotFound'

      };
    } else if (e instanceof DbChangePasswordBadPasswordError) {

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
