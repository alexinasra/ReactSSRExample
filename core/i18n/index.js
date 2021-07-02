const path = require('path');
const fs = require('fs');
const express = require('express');
const flattenkeys = require('flattenkeys');
const i18next = require('i18next');
const i18nMiddleware = require('i18next-http-middleware');
const Backend = require('i18next-node-fs-backend');
const deepmerge = require('deepmerge');
const webpack = require('webpack');
const utils = require('@react-ssrex/utils');
const saveJson = utils.json.saveJson;
const { initReactI18next } = require('react-i18next');
const {
  translationsDir,
  languages,
  defaultLanguage,
  defaultNamespace
} = require('@react-ssrex/config/i18n.config')

// require('es6-promise').polyfill();
require('universal-fetch');
module.exports = async function setup({
  app
}) {
  const _defaultSearchOptions = {
    order: 'ASC',
    rowsPerPage: 5,
  }

  const namespaces = fs.readdirSync(translationsDir);


    i18next.removeNamespace = (ns) => {
      i18next.options.ns = i18next.options.ns.filter(n => (n !== ns));
      i18next.loadNamespaces(i18next.options.ns);
    }
    i18next.use(Backend).use(i18nMiddleware.LanguageDetector).use(initReactI18next).init({
      debug: false,
      backend: {
        // root directory for translation, this prop is not part of backed library
        // it's an application level options for dynamic namespaces creation and files
        // manipulation.
        translationsRootDir: translationsDir,
        // path where resources get loaded from
        loadPath: path.join(translationsDir, './{{ns}}/{{lng}}.json'),
        // path to post missing resources
        addPath: path.join(translationsDir, './{{ns}}/missing.json'),
        // jsonIndent to use when storing json files
        jsonIndent: '\t',
        cache: false
      },
      detection: {
        // order and from where user language should be detected
        order: ['querystring','cookie'],
        //caches: ['session'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupHeader: 'accept-language',
        lookupSession: 'lng',
        lookupFromPathIndex: 0,
        // optional expire and domain for set cookie
        // cookieExpirationDate: new Date(),
        // cookieDomain: 'localhost',
        //cookieSecure: true // if need secure cookie

      },
      react: {
        useSuspense: false
      },
      ns: [...namespaces],
      defaultNs: defaultNamespace,
      defaultNS: defaultNamespace,
      //lng: defaultLanguage,
      fallbackLng: defaultLanguage,
      load: 'languageOnly',
      preload: [...languages],
      whitelist: [...languages],
      languages: [...languages],
      saveMissing: true,
      returnObjects: true
    });

    app.use(i18nMiddleware.handle(i18next));
    app.use((req, res, next) => {
      req.i18n.removeNamespace = (ns) => {
        i18next.removeNamespace(ns)
      }
      return next();
    })
    app.use('/translations', express.static(translationsDir));

    app.get('/translations/languages', (req, res) => {
      res.json(languages);
    });
    app.get('/translations/default-language', (req, res) => {
      res.json(req.language);
    });

    app.get('/translations/namespaces', (req, res) => {
      res.json(namespaces);
    });



    // TODO: currentlly serving only development builds. figure out production use-case.
    return new Promise((resolve, reject) => {
      if(process.env.NODE_ENV === 'development') {
        const config = require('./webpack.config');
        const compiler = webpack(config);
        compiler.watch({}, (err/*, stats*/) => {
          if(err) {
            return reject(err);
          }
          resolve();
        })
      }

    })

}
