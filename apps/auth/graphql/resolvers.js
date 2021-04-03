
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
      const userId = 'user-generated-uuid';

      const user = {
        ...signupForm.userInput,
        id: userId,
        password: signupForm.password,
        profilePicture: userDir.getProfilePictureUrl(userId, 'default_profile_picture.png'),
      }
      //create home directory
      await userDir.createHomeDir(userId);

      return { user, status: { code: STATUS_CODE.Success }, token: '' };
    },
    signinWithEmail: async function signinWithEmail(root, { email, password }, {req}) {
      const userId = 'user-generated-uuid';
      return {
        status: {
          code: STATUS_CODE.Success
        },
        user: {
          id: userId,
          email,
          firstname: 'Demo User',
          lastname: 'Demo User',
          password: password,
          profilePicture: userDir.getProfilePictureUrl(userId, 'default_profile_picture.png'),
        }
      };
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
