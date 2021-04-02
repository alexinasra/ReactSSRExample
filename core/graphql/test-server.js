/* eslint-disable */
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

var rethinkdbConfig = require('@foodle/config/rethinkdb.config');
var attachAssets = require('@foodle/assets/attach');

const attachGraphQL = require('@foodle/graphql/attach');
const attachDatabase = require('@foodle/database/attach');
const attachI18n = require('@foodle/i18n/attach');
const app = express();



// set the view engine to ejs
app.set('view engine', 'ejs');

// Set cors and bodyParser middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));

Promise.all([
  attachI18n({
    app,
    translationsDir: path.resolve("../translations"),
    languages: ['en', 'ar', 'he'],
    defaultLanguage: 'en',
    defaultNamespace: 'common'
  }),
  attachDatabase({ app, config: rethinkdbConfig }),
  attachGraphQL({ app }),
]).then(() => {
  console.log('starting server')
  app.listen({host: "localhost", port:3030});
}).catch(console.log)
