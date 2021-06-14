const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');
const userDir =  require('@react-ssrex/userconsole/graphql/user-dir');


const STATUS_CODE = {
  Success: "Success",
  InputError: "InputError",
  InvalidEmail: "InvalidEmail",
  InvalidPassword: "InvalidPassword",
  EmailBooked: "EmailBooked",
  DuplicateSignin: "DuplicateSignin",
  UserNotFound: "UserNotFound",
  IncorrectPassword: "IncorrectPassword",
  UnauthenticatedUser: "UnauthenticatedUser",
  ServerError: "ServerError"
};

const resolvers = {
  Query: {
    userInRole: (root, args, { req }) => {
      return req.user;
    },
  },
  Mutation: {
    signup: async function registerUser(root, { input }, { req, UsersDb, generateId }) {
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
        return { error: STATUS_CODE.ServerError, }
      }
    },
    signin: async function signinWithEmail(root, { input: { email, password } }, { req, UsersDb, generateId }) {
      try {
        const result = await UsersDb.login(email, password);

        await (new Promise(function(resolve, reject) {
          req.login(user, (err)=> {
            if(err) return reject(err);
            resolve();
          });
        }));
        return {
          user: result.user
        };
      } catch (e) {
        if (e instanceof DbLoginUserNotFoundError) {

          return {
            error: STATUS_CODE.UserNotFound
          };
        } else if (e instanceof DbLoginBadPasswordError) {

          return {
            error: STATUS_CODE.IncorrectPassword
          };
        } else  {
          console.log(e)
          return {
            error: STATUS_CODE.ServerError,
          };
        }
      }
    },
    signout: async (root, args, { req }) => {
      if (!req.user) {
        return { error: STATUS_CODE.UnauthenticatedUser }
      }

      req.logout();
      return { error: null }
    },
    changePassword: async function (root, { password, newPassword }, { req, UsersDb, generateId }) {
      if (!req.user) {
        return { error: STATUS_CODE.UnauthenticatedUser };
      }

      try {
        const result = await UsersDb.changePassword(generateId(req.user._id), password, newPassword);

        return {
          error : null
        };
      } catch (e) {
        if (e instanceof DbChangePasswordUserNotFoundError) {

          return {
            error: STATUS_CODE.UserNotFound

          };
        } else if (e instanceof DbChangePasswordBadPasswordError) {

          return {
            error: STATUS_CODE.IncorrectPassword
          };
        } else  {
          return {
            error: STATUS_CODE.ServerError,
          };
        }
      }
    }
  },
};

module.exports = resolvers;
