const { DbTable } = require('@foodle/database');

const UsersTable = new DbTable({ tableName: 'Users' });
const userDir =  require('@foodle/userconsole/graphql/user-dir');

const STATUS_CODE = {
  Success: "Success",
  InputError: "InputError",
  InvalidEmail: "InvalidEmail",
  InvalidPassword: "InvalidPassword",
  EmailBooked: "EmailBooked",
  DuplicateSignin: "DuplicateSignin",
  UserNotFound: "UserNotFound",
  IncorrectPassword: "IncorrectPassword",
  UnauthenticatedUser: "UnauthenticatedUser"
};

const resolvers = {
  AuthStatusCode: STATUS_CODE,
  Query: {
    userInRole: (root, args, { req }) => req.user
  },
  Mutation: {
    signupWithEmail: async function registerUser(root, { signupForm }, {req}) {
      // get db connection.

      const conn = await req.connectionPool.getConnection();
      const userId = await DbTable.r.uuid().run(conn);

      // insert user and get generated id
      await UsersTable.insert({
        ...signupForm.userInput,
        id: userId,
        password: signupForm.password,
        profilePicture: userDir.getProfilePictureUrl(userId, 'default_profile_picture.png'),
      }).run(conn);

      await userDir.createHomeDir(userId);
      // get user from database (in case database adds some values)
      const user = await UsersTable.get(userId).run(conn);

      // release aquierd db connection back to connection pool
      conn.release();

      // programmaticly login user
      await new Promise(function(resolve) {
        req.login(user, resolve);
      });

      return { user, status: { code: STATUS_CODE.Success }, token: '' };
    },
    signinWithEmail: async function signinWithEmail(root, { email, password }, {req}) {
      // get db connection.
      const conn = await req.connectionPool.getConnection();
      try {
        let user = await UsersTable.getFisrtResult(
          (user) => user('email').match(email)
        ).run(conn);

        if(user.password === password) {
          delete user.password;
          await new Promise(resolve => req.login(user, resolve));
          return {status: { code: STATUS_CODE.Success }, user };
        } else {
          return ({status: { code: STATUS_CODE.IncorrectPassword}, user })
        }
      } catch {
        return {status: { code: STATUS_CODE.UserNotFound}};
      }
    },
    signout: function signout(root, args, { req }) {
      return new Promise(function(resolve, reject) {
        if (!req.user) {
          return resolve({status: { code: STATUS_CODE.UnauthenticatedUser} })
        }
        req.logout();
        resolve({ status: { code: STATUS_CODE.Success } })

      });
    },
    changePassword: async function (root, { password }, { req }) {
      if (!req.user) {
        return {
          status: { code: STATUS_CODE.UnauthenticatedUser }
        };
      }
      const conn = await req.connectionPool.getConnection();
      await UsersTable.update(req.user.id, { password }).run(conn);
      const user = await UsersTable.get(req.user.id).run(conn).finally(() => conn.release());

      return {
        user,
        status: {
          code: STATUS_CODE.Success
        }
      };
    }
  },
};

module.exports = resolvers;
