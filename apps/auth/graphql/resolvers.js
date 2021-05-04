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
    userInRole: (root, args, { req }) => (req.session.userInRole),
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
        req.session.userInRole = user;
        return { user };
      } catch (e) {
        // TODO: check for other errors.
        return { error: STATUS_CODE.ServerError, }
      }
    },
    signin: async function signinWithEmail(root, { input: { email, password } }, { req, UsersDb, generateId }) {
      try {
        const result = await UsersDb.login(email, password);
        req.session.userInRole = result.user

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
          return {
            error: STATUS_CODE.ServerError,
          };
        }
      }
    },
    signout: (root, args, { req }) => {
      if (!req.session.userInRole) {
        return resolve({ error: STATUS_CODE.UnauthenticatedUser })
      }
      req.session.userInRole = null;
      return { error: null }
    },
    changePassword: async function (root, { password, newPassword }, { req, UsersDb, generateId }) {
      if (!req.session.userInRole) {
        return { error: STATUS_CODE.UnauthenticatedUser };
      }

      try {
        const result = await UsersDb.changePassword(generateId(req.session.userInRole._id), password, newPassword);
        req.session.userInRole = {
          ...result.user
        }

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
