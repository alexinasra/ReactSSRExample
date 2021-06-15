const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');

module.exports = async function signin(root, { input: { email, password } }, { req, UsersDb, generateId }) {
  try {
    const { user } = await UsersDb.login(email, password);

    await (new Promise(function(resolve, reject) {
      req.login(user, (err)=> {
        if(err) return reject(err);
        resolve();
      });
    }));
    return {
      user
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
      console.log(e)
      return {
        error: 'ServerError',
      };
    }
  }
}
