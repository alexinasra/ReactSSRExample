const UsersDb = require('@react-ssrex/database/UsersDb');
const {
  DbLoginBadPasswordError,
  DbLoginUserNotFoundError ,
  DbChangePasswordBadPasswordError,
  DbChangePasswordUserNotFoundError,
} = require('@react-ssrex/database/DbError');
const userDir =  require('@react-ssrex/userconsole/graphql/user-dir');

const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

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
    signup: async function registerUser(root, { input }, { req, mongoClient, generateId }) {
      const userId = generateId();
      const database = await mongoClient.db(MongoDbConfig.db)
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
        const user = await UsersDb.with(database).create(userData, input.email, input.password);
        await UsersDb.with(database).login(input.email, input.password)
        req.session.userInRole = user;
        return { user };
      } catch (e) {
        // TODO: check for other errors.
        return { error: STATUS_CODE.ServerError, }
      }
    },
    signin: async function signinWithEmail(root, { input: { email, password } }, { req, mongoClient, generateId }) {
      const database = await mongoClient.db(MongoDbConfig.db);
      try {
        const result = await UsersDb.with(database).login(email, password);
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
    changePassword: async function (root, { password, newPassword }, { req, mongoClient, generateId }) {
      const database = await mongoClient.db(MongoDbConfig.db);
      if (!req.session.userInRole) {
        return { error: STATUS_CODE.UnauthenticatedUser };
      }

      try {
        const result = await UsersDb.with(database).changePassword(generateId(req.session.userInRole._id), password, newPassword);
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
