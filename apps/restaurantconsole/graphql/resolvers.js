const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");
const { DbTable } = require('@foodle/database');
const userDir = require('./user-dir');

const UsersTable = new DbTable({ tableName: 'Users' });
const RestaurantsTable = new DbTable({ tableName: 'Restaurants' });

module.exports = {
  Query: {

  },
  User: {
    profilePictures: async function (root, args, { req }) {
      try{
        const arr = await userDir.getProfilePictures(req.user.id);
        return arr.map(f => userDir.getProfilePictureUrl(req.user.id, f));
      } catch(error) {
        console.log(error);
        return [];
      }
    },
    preferedLanguage: (root, args, { req }) => {
      const language = root.preferedLanguage || req.i18n.languages[0];
      return language;
    },
  },
  Mutation: {
    changeRestaurantLogo: async (root, { logoUrlData}, { req }) => {
      const { user, connectionPool } = req;
      const conn = await connectionPool.getConnection();
      await RestaurantsTable
        .getFisrtResult({
          userId: user.id
        })
        .update({
          logo: logoUrlData
        })
        .run(conn);

      return RestaurantsTable
                .getFirstResult({ userId: user.id })
                .run(conn)
                .finally(conn.release);
    },
    changeRestaurantCover: async (root, { coverUrlData }, { req }) => {
      const { user, connectionPool } = req;
      const conn = await connectionPool.getConnection();
      await RestaurantsTable
        .getFisrtResult({
          userId: user.id
        })
        .update({
          cover: coverUrlData
        })
        .run(conn);

      return RestaurantsTable
                .getFirstResult({ userId: user.id })
                .run(conn)
                .finally(conn.release);
    }
  }
}
