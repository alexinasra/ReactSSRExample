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
    userById: function getUserById(id) {},
    userByUsername: function getUserByUsername(username) {},
    userByEmail: function getUserByUsername(email) {},
  },
  Upload: GraphQLUpload,
  User: {
    profilePicture: function ({ profilePicture }, args, { req }) {
      if(profilePicture) {
        return profilePicture
      }
      return "/public/defaults/default-profile-picture.png";
    },
    ownsRestaurant: ({ restaurantId }) => !!restaurantId,
    restaurant: async ({ restaurantId }, args, { req }) => {
      const conn = await req.connectionPool.getConnection();
      const restaurant = await RestaurantsTable.get(restaurantId).run(conn);
      conn.release();
      return restaurant;
    }
  },
  Restaurant: {
    owner: async ({ id }, args, { req }) => {
      const conn = await req.connectionPool.getConnection();
      const user = await UsersTable.getFisrtResult({ restaurantId: id }).run(conn);
      conn.release();
      return user;
    }
  }
};

module.exports = resolvers;
