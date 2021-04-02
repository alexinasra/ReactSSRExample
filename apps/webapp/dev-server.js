/* eslint-disable */
const path = require('path');
import express from 'express';
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

// Configurations
const rethinkdbConfig = require('@foodle/config/rethinkdb.config');

// Services
const attachAssets = require('@foodle/assets/attach');
const attachGraphQL = require('@foodle/graphql/attach');
const attachDatabase = require('@foodle/database/attach');
const attachI18n = require('@foodle/i18n/attach');

// Applications
const attachAuth = require('@foodle/auth/attach');
const attachUserConsole = require('@foodle/userconsole/attach');
const attachAdminConsole = require('@foodle/adminconsole/attach');
const attachWebApp = require('@foodle/webapp/attach');

const app = express();

/*
  * Global Variables
*/
global.isServer = true;
global.ROOT_DIR = path.resolve(__dirname, '../..');


//Application Confituration
(async () => {

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

  await attachDatabase({ app, config: rethinkdbConfig });

  await attachGraphQL({ app });
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
