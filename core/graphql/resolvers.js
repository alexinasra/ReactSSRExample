const { GraphQLUpload } = require('graphql-modules');

const resolvers = {
  Mutation: {
    setThemeName: async (root, { themeName }, { req, UsersDb, generateId }) => {
      const userId = req.user._id;
      const user = await UsersDb.update(generateId(userId), {
        themeSettings: {
          ...req.user.themeSettings,
          name: themeName
        }
      })
      return user;
    },
    setThemeMode: async (root, { themeMode }, { req, UsersDb, generateId }) => {
      const userId = req.user._id;
      const user = await UsersDb.update(generateId(userId), {
        themeSettings: {
          ...req.user.themeSettings,
          mode: themeMode
        }
      })

      return user;
    },
    toggleThemeMode: async (root, args, { req, UsersDb, generateId }) => {
      const userId = req.user._id;
      const themeMode = req.user.themeSettings.mode !== 'light'? 'light' : 'dark';
      const user = await UsersDb.update(generateId(userId), {
        themeSettings: {
          ...req.user.themeSettings,
          mode: themeMode
        }
      })
      return user;
    }
  },
  Upload: GraphQLUpload,
  User: {
    id: (root) => root['_id'],

    preferedLanguage: (root, args, { req }) => {
      const language = root.preferedLanguage || req.i18n.languages[0];
      return language;
    },
    profilePicture: ({ profilePicture }, args, { req }) => {
      if(profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    },
    themeSettings: ({ themeSettings }) => {
      return themeSettings ? themeSettings : ({
        name: 'default',
        mode: 'light'
      })
    }
  }
};

module.exports = resolvers;
