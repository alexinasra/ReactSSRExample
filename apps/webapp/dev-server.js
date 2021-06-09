/* eslint-disable */
const path = require('path');
import express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');


const { MongoClient, ObjectId } = require('mongodb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

// Services
const attachAssets = require('@react-ssrex/assets/attach');
const attachGraphQL = require('@react-ssrex/graphql/attach');
const attachI18n = require('@react-ssrex/i18n/attach');

// Applications
const attachAuth = require('@react-ssrex/auth/attach');
const attachUserConsole = require('@react-ssrex/userconsole/attach');
const attachAdminConsole = require('@react-ssrex/adminconsole/attach');
const attachWebApp = require('@react-ssrex/webapp/attach');

const app = express();

/*
  * Global Variables
*/
global.isServer = true;
global.ROOT_DIR = path.resolve(__dirname, '../..');


//Application Confituration
(async () => {
  const connectionUrl = `mongodb://${MongoDbConfig.host}:${MongoDbConfig.port}?${Object.keys(MongoDbConfig.options).map(key => key + '=' + MongoDbConfig.options[key]).join('&')}`
  const mongoClient = new MongoClient(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });


  const client = await mongoClient.connect()
  const database = await client.db(MongoDbConfig.db);
  // set the view engine to ejs
  app.set('view engine', 'ejs');

  // Set cors and bodyParser middlewares
  app.use(require('cookie-parser')());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: false}));
  app.use('*', cors({ origin: 'http://localhost:3030', credentials: true }));
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  }));

  app.use('/uploads', express.static('../../uploads'));

  await attachAssets({ app });
  await attachI18n({
    app,
    translationsDir: path.resolve("../../translations"),
    languages: ['en', 'ar', 'he'],
    defaultLanguage: 'en',
    defaultNamespace: 'common'
  });

  await attachGraphQL({ app, mongoClient: client, mongoDatabase: database });
  await attachAuth({ app }); //Webapp depends on auth module
  if(process.env.ENABLE_USERCONSOLE) {
    await attachUserConsole({ app }); //disabled by default
  }
  if(process.env.ENABLE_ADMINCONSOLE) {
    await attachAdminConsole({ app }); //disabled by default
  }
  await attachWebApp({ app });
  app.listen(3030, () => {
    console.log('Server Started');
    if (process.pid) {
      console.log('This process is your pid ' + process.pid);
    }
  })
})();
