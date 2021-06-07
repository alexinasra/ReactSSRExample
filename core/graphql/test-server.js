/* eslint-disable */
const path = require('path');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');

const { MongoClient, ObjectId } = require('mongodb');
const MongoDbConfig = require('@react-ssrex/config/mongodb.config.js');

var attachAssets = require('@react-ssrex/assets/attach');

const attachGraphQL = require('@react-ssrex/graphql/attach');
const attachI18n = require('@react-ssrex/i18n/attach');
const app = express();

(async function startTestServer() {
  const connectionUrl = `mongodb://${MongoDbConfig.host}:${MongoDbConfig.port}?${Object.keys(MongoDbConfig.options).map(key => key + '=' + MongoDbConfig.options[key]).join('&')}`
  const mongoClient = new MongoClient(connectionUrl, { useNewUrlParser: true, useUnifiedTopology: true });


  const client = await mongoClient.connect()
  const database = await client.db(MongoDbConfig.db);

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
      translationsDir: path.resolve("../../translations"),
      languages: ['en', 'ar', 'he'],
      defaultLanguage: 'en',
      defaultNamespace: 'common'
    }),
    attachGraphQL({ app, mongoClient: client, mongoDatabase: database }),
  ]).then(() => {
    console.log('starting server')
    app.listen({host: "localhost", port:3030});
  }).catch(console.log)
})();
