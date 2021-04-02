const path = require("path");
const { createWriteStream, mkdirSync, readdirSync } = require("fs");
const { DbTable } = require('@foodle/database');
const userDir = require('./user-dir');

const UsersTable = new DbTable({ tableName: 'Users' });

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
    updateProfilePicture: async function(root, { url }, { req }) {
      const conn = await req.connectionPool.getConnection();
      await UsersTable.update(req.user.id, { profilePicture: url }).run(conn)
      return await UsersTable.get(req.user.id).run(conn).finally(conn.release);
    },
    uploadProfilePicture: async function (root, { file }, { req }) {
      const { createReadStream, filename, mimetype, encoding } = await file;
      const conn = await req.connectionPool.getConnection();

      await userDir.addProfilePicture(req.user.id, createReadStream(), filename);
      await UsersTable.update(req.user.id, { profilePicture: userDir.getProfilePictureUrl(req.user.id, filename) }).run(conn);
      return await UsersTable.get(req.user.id).run(conn).finally(conn.release);
    },
    setPreferedLanguage: async function (root, { lng }, { req }) {
      const conn = await req.connectionPool.getConnection();
      await UsersTable.update(req.user.id, { preferedLanguage: lng });
      await req.i18n.changeLanguage(lng);
      return await UsersTable.get(req.user.id).run(conn).finally(conn.release);
    },
  }
}
