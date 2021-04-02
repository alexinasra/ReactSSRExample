const { DbTable } = require('@foodle/database');
const UsersTable = new DbTable({ tableName: 'Users' });

module.exports = {
  Mutation: {
    editUserProfile(root, { userId, editForm }, { req }) {
      return new Promise(function(resolve, reject) {
        req.connectionPool.getConnection()
          .catch(reject)
          .then(conn => {
            UsersTable.update(userId, editForm).run(conn)
              .catch(reject)
              .then(() => {
                UsersTable.get(userId).run(conn)
                  .catch(reject)
                  .then(resolve)
                  .finally(() => conn.release());
              })
          })
      });
    }
  }
}
