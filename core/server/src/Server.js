const EventEmitter = require('events');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { logger } = require('@react-ssrex/utils');

const { RedisPubSub } = require('graphql-redis-subscriptions');
const Redis = require('ioredis');
const RedisOptions = require('@react-ssrex/config/redis.config');

const setupAssets = require('@react-ssrex/assets');
const setupI18n = require('@react-ssrex/i18n');
const setupGraphql = require('@react-ssrex/graphql');

const {
  createServer
} = require('http');

const cors = require('cors');
const {
  MongoClient,
  ObjectId
} = require('mongodb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

const expressJwt = require("express-jwt");
const DbError = require('@react-ssrex/database/DbError');
const UsersDb = require('@react-ssrex/database/UsersDb');

const ServerError = require('./ServerError');

const connectionUrl = `mongodb://${MongoDbConfig.host}:${MongoDbConfig.port}?${Object.keys(MongoDbConfig.options).map(key => key + '=' + MongoDbConfig.options[key]).join('&')}`
const mongoClient = new MongoClient(connectionUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const app = express();
const server = createServer(app);
const pubSub = new RedisPubSub({
  publisher: new Redis(RedisOptions),
  subscriber: new Redis(RedisOptions),
})

module.exports = class Server extends EventEmitter {

  constructor(attachables, options = {}) {
    super();
    this.host = options.host || 'localhost';
    this.port = options.port || 3030;
    this.log = logger.child({
      module: '@react-ssrex/server',
      at: 'Server Class'
    });

    this.attachables = attachables;
  }

  get mongoClient() {
    return mongoClient;
  }

  setupMiddlewares = async () => {
    this.log.info('connecting to database server', { connectionUrl});
    this.client = await mongoClient.connect()
    this.log.info('selecting database', { db: MongoDbConfig.db} );
    this.database = await this.client.db(MongoDbConfig.db);

    this.usersDb = UsersDb.with(this.database);


    process.on('SIGINT', () => {
      this.client.close(() => {
        this.log.info('closing mongodb connection');
        process.exit(0);
      });
    });

    app.use((req, res, next) => {
      req.mongoClient = this.client;
      next();
    })

      // Set cors and bodyParser middlewares
      app.use('*', cors({
        origin: "*",
        credentials: true
      }));
      app.use(cookieParser());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({
        extended: false
      }));

    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const {
            user
          } = await this.usersDb.login(email, password, 0);


          // const token = jwt.sign({ userId: user._id }, 'TOP_SECRET');
          // user.token = token;
          return done(null, user);
        } catch (e) {
          if (e instanceof DbError.DbLoginUserNotFoundError || e instanceof DbError.DbLoginBadPasswordError) {
            return done(null, false, {
              message: e.message
            });
          }
          return done(e)
        }
      }
    ));

    passport.use('jwt-token', new JWTstrategy({
        secretOrKey: 'TOP_SECRET',
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        // issuer: 'accounts.examplesoft.com',
        // audience: 'yoursite.net'
      },
      async (token, done) => {
        try {
          const user = await this.usersDb.get(token.userId);
          return done(null, user);
        } catch (e) {
          done(e);
        }
      }
    ));

    passport.serializeUser((user, done) => {
      if (user)
        done(null, user._id.toString());
    });

    passport.deserializeUser((id, done) => {
      if (id) {
        (async () => {
          try {
            const user = await this.usersDb.get(id);
            return done(null, user);
          } catch (e) {
            done(e);
          }
        })()
      }
    });

    app.use(passport.initialize());

    app.use('/uploads', express.static('../../uploads'));
    setupAssets({ app });
    await setupI18n({ app })
    await setupGraphql({
      app,
      server,
      passport,
      pubSub,
      mongoClient: this.client,
      mongoDatabase: this.database,
      UsersDb: this.usersDb
    })
  }
  attachModule = async (moduleName, attachable) => {
    try {
      this.log.info('Loading attachable module', {
        moduleName
      })
      await attachable({
        app,
        server,
        mongoClient: this.client,
        mongoDatabase: this.database,
        UsersDb: this.usersDb
      });
    } catch (e) {

      this.log.error('failed to load module', {
        moduleName,
        error: e
      })
      process.exit(-1);
    }
  }
  start = async () => {
    this.log.info('starting server');
    // set the view engine to ejs
    app.set('view engine', 'ejs');
    await this.setupMiddlewares();
    for (let moduleName of this.attachables) {
      await this.attachModule(moduleName, require(moduleName))
    }
    server.listen(this.port, () => {
      this.log.info('Server Started', {
        host: this.host,
        port: this.port,
      });
      server.emit('listening', server);
    })
  }
}
