const { GraphQLUpload } = require('graphql-modules');

const { DbTable } = require('@foodle/database');

const UsersTable = new DbTable({ tableName: 'Users' });
const RestaurantsTable = new DbTable({ tableName: 'Restaurants' });
const resolvers = {
  Query: {
    application: () => ({ name: 'Lookfor Emirates' }),
    users: async (root, args, { req }) => {
      const conn = req.connectionPool.getConnection();
      const users = await UsersTable.getAll().run(conn);
      conn.release();
      return users.toArray();
    },
  },
  Upload: GraphQLUpload,
  User: {
    profilePicture: function ({ profilePicture }, args, { req }) {
      if(profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    }
  }
};

module.exports = resolvers;
