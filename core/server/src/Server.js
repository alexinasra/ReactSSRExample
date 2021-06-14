import EventEmitter from 'events';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
const MongoDBStore = require('connect-mongodb-session')(session);

import cors from 'cors';

const { MongoClient, ObjectId } = require('mongodb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const DbError = require('@react-ssrex/database/DbError');
const UsersDb = require('@react-ssrex/database/UsersDb');

import ServerError from './ServerError';

// Services
const attachAssets = require('@react-ssrex/assets/attach');
const attachGraphQL = require('@react-ssrex/graphql/attach');
const attachI18n = require('@react-ssrex/i18n/attach');

// Applications
const attachAuth = require('@react-ssrex/auth/attach');
const attachAdminConsole = require('@react-ssrex/adminconsole/attach');
const attachUserConsole = require('@react-ssrex/userconsole/attach');
const attachWebApp = require('@react-ssrex/webapp/attach');


const connectionUrl = `mongodb://${MongoDbConfig.host}:${MongoDbConfig.port}?${Object.keys(MongoDbConfig.options).map(key => key + '=' + MongoDbConfig.options[key]).join('&')}`
const mongoClient = new MongoClient(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });


const app = express();
export default class Server extends EventEmitter {

  constructor(options = {}){
    super();
    this.host = options.host || 'localhost';
    this.port = options.port || 3030;
  }

  get mongoClient () {
    return mongoClient;
  }

  setupMiddlewares = async () => {

    this.client = await mongoClient.connect()
    this.database = await this.client.db(MongoDbConfig.db);

    this.usersDb = UsersDb.with(this.database);


    process.on('SIGINT', () => {
      this.client.close(() => {
        console.log('closing mongodb connection');
        process.exit(0);
      });
    });

    app.use((req, res, next) => {
      req.mongoClient = this.client;
      next();
    })
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const { user } = await this.usersDb.login(email, password, 0)
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
      if (user)
        done(null, user._id.toString());
    });

    passport.deserializeUser((id, done) => {
      if(id){
        (async () => {try {
          const user = await this.usersDb.get(id);
          return done(null, user);
        } catch (e) {
          done(e);
        }})()
      }
    });

    // Set cors and bodyParser middlewares
    app.use('*', cors({ origin: "*", credentials: true }));

    const  store = new MongoDBStore({
      uri: connectionUrl,
      connectionOptions: MongoDbConfig.options,
      databaseName: MongoDbConfig.db,
      collection: 'user_session',

    });
    store.on('error', function(error) {
      // Also get an error here
      console.log(error)
    });
    app.use(session({
      secret: 'keyboard cat',
      store: store,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
      },
    }));
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use('/uploads', express.static('../../uploads'));
  }
  attachModule = async (moduleName, attachable, options = {}) => {
    try {
      await attachable({ app: app, ...options });
    } catch (e){
      console.log(e)
      throw new ServerError(`Unable to load @react-ssrex/${moduleName}.`);
    }
  }
  start = async () => {

    // set the view engine to ejs
    app.set('view engine', 'ejs');
    this.setupMiddlewares();

    await this.attachModule('assets', attachAssets);
    await this.attachModule('i18n', attachI18n, {
      translationsDir: path.resolve("../../translations"),
      languages: ['en', 'ar', 'he'],
      defaultLanguage: 'en',
      defaultNamespace: 'common'
    });

    await this.attachModule('graphql', attachGraphQL, {
      mongoClient: this.client,
      mongoDatabase: this.database,
      UsersDb: this.usersDb
    });
    await this.attachModule('auth', attachAuth);
    await this.attachModule('adminConsole', attachAdminConsole);
    await this.attachModule('userConsole', attachUserConsole);
    await this.attachModule('webapp', attachWebApp);

    app.listen(3030, () => {
      console.log('Server Started');
      this.emit('server-ready');
    })
  }
}
