const UsersDb = require('@react-ssrex/database/UsersDb');
const { DbLoginBadPasswordError, DbLoginUserNotFoundError } = require('@react-ssrex/database/DbError');
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
  AuthStatusCode: STATUS_CODE,
  Query: {
    userInRole: (root, args, { req }) => (req.session.userInRole),
  },
  Mutation: {
    signupWithEmail: async function registerUser(root, { signupForm }, { req, mongoClient, generateId }) {
      const userId = generateId();
      const client = await mongoClient.connect();
      const database = await client.db(MongoDbConfig.db)

      //create home directory
      await userDir.createHomeDir(userId.toString());

      const userData = {
        firstname: signupForm.firstname,
        lastname: signupForm.lastname,
        _id: userId,
        profilePicture: userDir.getProfilePictureUrl(userId.toString(), 'default_profile_picture.png'),
      }

      const user = await UsersDb.with(database).create(userData, signupForm.email, signupForm.password)

      return { user, status: { code: STATUS_CODE.Success }, token: '' };
    },
    signinWithEmail: async function signinWithEmail(root, { email, password }, { req, mongoClient, generateId }) {
      const client = await mongoClient.connect();
      const database = await client.db(MongoDbConfig.db);
      try {
        const result = await UsersDb.with(database).login(email, password);
        req.session.userInRole = {
          ...result.user
        }

        return {
          status: {
            code: STATUS_CODE.Success
          },
          user: result.user
        };
      } catch (e) {
        if (e instanceof DbLoginUserNotFoundError) {

          return {
            status: {
              code: STATUS_CODE.UserNotFound
            },
          };
        } else if (e instanceof DbLoginBadPasswordError) {

          return {
            status: {
              code: STATUS_CODE.IncorrectPassword
            },
          };
        } else  {
          return {
            status: {
              code: STATUS_CODE.ServerError,
              msg: e.message
            },
          };
        }
      }
    },
    signout: function signout(root, args, { req }) {
      return new Promise(function(resolve, reject) {
        if (!req.session.userInRole) {
          return resolve({status: { code: STATUS_CODE.UnauthenticatedUser} })
        }
        req.session.userInRole = null;
        resolve({ status: { code: STATUS_CODE.Success } })

      });
    },
    changePassword: async function (root, { password }, { req }) {
      if (!req.user) {
        return {
          status: { code: STATUS_CODE.UnauthenticatedUser }
        };
      }
      return {
        user: req.user,
        status: {
          code: STATUS_CODE.Success
        }
      };
    }
  },
};

module.exports = resolvers;
