import EventEmitter from 'events';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import cors from 'cors';
import r from "rethinkdb";
import passport from "passport";

import { Strategy as LocalStrategy } from 'passport-local';
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


const app = express();
export default class Server extends EventEmitter {
  constructor(options = {}){
    super();
    this.host = options.host || 'localhost';
    this.port = options.port || 3030;
  }

  setupMiddlewares = () => {
    // Set cors and bodyParser middlewares
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use('*', cors({ origin: 'http://localhost:3030', credentials: true }));

    app.use(session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false },
    }));

    app.use('/uploads', express.static('../../uploads'));

  }
  attachModule = async (moduleName, attachable, options = {}) => {
    try {
      await attachable({ app: app, ...options });
    } catch (e){
      throw ServerError(`Unable to load @react-ssrex/${moduleName}.`);
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

    await this.attachModule('graphql', attachGraphQL);
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
