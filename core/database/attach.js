const ConnectionPool = require('./ConnectionPool');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { DbTable } = require('@foodle/database');

const UsersTable = new DbTable({ tableName: 'Users' });


module.exports = function attach({ app, config }) {
  const pool = new ConnectionPool(config);
  app.use(pool.attachToRequest());
  app.connectionPool = pool;
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, function AuthenticateUser(email, password, done) {
    pool.getConnection()
      .then(conn => {
        UsersTable.getFisrtResult((user) => user('email').match(email))
          .run(conn)
          .then(user => {
            if(user.password === password) {
              return done(null, user)
            }
            delete user.password;
            done(null, false, { code: 2, msg: "Incorrect Password", user })
          })
          .catch(err => done(null, false, { code: 3, msg: "User Not Found" }))
          .finally(() => conn.release())
      })
      .catch(done)
  }));
  
  passport.serializeUser(function(user, done) {
    console.log(user);
    if (user)
      done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    pool.getConnection()
      .then(conn => {
        UsersTable.get(id)
          .run(conn)
          .then(user => {
            delete user.password;
            done(null, user)
          })
          .catch(done)
          .finally(() => conn.release())
      })
      .catch(done);
  });
  app.use(passport.initialize());
  app.use(passport.session());
  app.passport = passport;
  return Promise.resolve();
}
