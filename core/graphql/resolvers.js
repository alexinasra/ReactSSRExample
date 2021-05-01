const { GraphQLUpload } = require('graphql-modules');
const UsersDb = require('@react-ssrex/database/UsersDb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

const resolvers = {
  Mutation: {
    setThemeName: async (root, { themeName }, { req, mongoClient, generateId }) => {
      const database = await mongoClient.db(MongoDbConfig.db)
      console.log(themeName)
      const userId = req.session.userInRole._id;
      const user = await UsersDb.with(database).update(generateId(userId), {
        themeSettings: {
          ...req.session.userInRole.themeSettings,
          name: themeName
        }
      })
      req.session.userInRole = user;
      return user;
    },
    setThemeMode: async (root, { themeMode }, { req, mongoClient, generateId }) => {
      const database = await mongoClient.db(MongoDbConfig.db)

      const userId = req.session.userInRole._id;
      const user = await UsersDb.with(database).update(generateId(userId), {
        themeSettings: {
          ...req.session.userInRole.themeSettings,
          mode: themeMode
        }
      })
      req.session.userInRole = user;
      return user;
    },
    toggleThemeMode: async (root, args, { req, mongoClient, generateId }) => {
      const database = await mongoClient.db(MongoDbConfig.db)

      const userId = req.session.userInRole._id;
      const themeMode = req.session.userInRole.themeSettings.mode !== 'light'? 'light' : 'dark';
      const user = await UsersDb.with(database).update(generateId(userId), {
        themeSettings: {  
          ...req.session.userInRole.themeSettings,
          mode: themeMode
        }
      })
      req.session.userInRole = user;
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
