/* eslint-disable */
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoDBStore = require('connect-mongodb-session')(session);

const { MongoClient, ObjectId } = require('mongodb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const DbError = require('@react-ssrex/database/DbError');
const UsersDb = require('@react-ssrex/database/UsersDb');

const attachAssets = require('@react-ssrex/assets/attach');

const attachGraphQL = require('@react-ssrex/graphql/attach');
const attachI18n = require('@react-ssrex/i18n/attach');
const app = express();

(async function startTestServer() {
  const connectionUrl = `mongodb://${MongoDbConfig.host}:${MongoDbConfig.port}?${Object.keys(MongoDbConfig.options).map(key => key + '=' + MongoDbConfig.options[key]).join('&')}`
  const mongoClient = new MongoClient(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });


  const client = await mongoClient.connect()
  const database = await client.db(MongoDbConfig.db);

  const usersDb = UsersDb.with(database);

  process.on('SIGINT', () => {
    client.close(() => {
      console.log('closing mongodb connection');
      process.exit(0);
    });
  });
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const { user } = await usersDb.login(email, password, 0)
        return done(null, user);
      } catch (e) {
        if (e instanceof DbError.DbLoginUserNotFoundError || e instanceof DbError.DbLoginBadPasswordError) {
          return done(null, false, { message: e.message });
        }
        return done(e)
      }
    }
  ));
  passport.serializeUser((user, done) => {
    // console.log(user)
    if (user)
      done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    if(id){
      (async () => {try {
        const user = await usersDb.get(id);
        return done(null, user);
      } catch (e) {
        done(e);
      }})()
    }
  });

  // set the view engine to ejs
  app.set('view engine', 'ejs');

  const  store = new MongoDBStore({
    uri: connectionUrl,
    databaseName: MongoDbConfig.db,
    collection: 'user_session'
  });
  store.on('error', function(error) {
    // Also get an error here
    console.log(error)
  });
  app.use(session({
    secret: 'keyboard cat',
    // store: store,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
  }));
  // Set cors and bodyParser middlewares
  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));

  app.use(passport.initialize());
  app.use(passport.session());

  await attachI18n({
    app,
    translationsDir: path.resolve("../../translations"),
    languages: ['en', 'ar', 'he'],
    defaultLanguage: 'en',
    defaultNamespace: 'common'
  })
  await attachGraphQL({
    app,
    mongoClient: client,
    mongoDatabase: database,
    UsersDb : usersDb
  })
  console.log('starting server')
  app.listen({host: "localhost", port:3030});
})();
