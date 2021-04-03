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

require('es6-promise').polyfill();
require('universal-fetch');
module.exports = function attach({
  app,
  translationsDir="translations",
  languages,
  defaultLanguage,
  defaultNamespace
}) {
  const _defaultSearchOptions = {
    order: 'ASC',
    rowsPerPage: 5,
  }

  const namespaces = fs.readdirSync(translationsDir);

  return new Promise(function(resolve, reject) {

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
        order: ['querystring','session'],
        caches: ['session'],
        lookupQuerystring: 'lng',
        lookupCookie: 'i18next',
        lookupHeader: 'accept-language',
        lookupSession: 'lng',
        lookupFromPathIndex: 0,
        // optional expire and domain for set cookie
        cookieExpirationDate: new Date(),
        cookieDomain: 'localhost',
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

    app.post('/translations/languages', (req, res) => {
      const lng = req.body.lng;
      addLanguage(lng).then(() => {
        res.send(lng);
      }).catch(err => {
        res.status(500).json(err);
      });
    });
    app.get('/translations/languages', (req, res) => {
      res.json(languages);
    });
    app.get('/translations/default-language', (req, res) => {
      res.json(req.language);
    });

    app.get('/translations/keys/:ns', (req, res) => {
      const ns = req.params.ns;
      const keys = getResourceBundleKeys(ns);
      res.json(keys);
    });

    app.post('/translations/namespaces', (req, res) => {
      const ns = req.body.ns;
      addNamespace(ns).then(() => {
        res.json(ns);
      }).catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    });

    app.get('/translations/namespaces', (req, res) => {
      res.json(namespaces);
    });

    app.post('/translations', (req, res) => {
      const { lngs, ns } = req.body;
      const resources = {}
      for(const i in lngs) {
        resources[lngs[i]] = getResourceBundle(ns, lngs[i]);
      }
      res.json(resources);
    })

    app.get('/translations/:lng/:key/:ns', (req, res) => {
      const lng = req.params.lng;
      const ns = req.params.ns;
      const key = req.params.key;

      res.json(req.t((ns ? `${ns}:${key}`: key), { lng }));
    });

    app.post('/translations/delete/:key/:ns/', (req, res) => {
      const key = req.params.key;
      const ns = req.params.ns || defaultNamespace;
      deleteTranslation(key, ns)
        .then(() => res.json('ok'))
        .catch(err => res.status(500).json(err))
    });
    app.post('/translations/:lng/:key/:ns', (req, res) => {
      const lng = req.params.lng;
      const ns = req.params.ns || defaultNamespace;
      const value = req.body.value;
      const key = req.params.key;
      setTranslation(lng, key, value, ns)
        .then(() => {
          res.json({
            lng, ns, value, key
          });
        }).catch(err => {
          res.status(500).json(err);
        });
    });

    const config = require('./webpack.config');
    const compiler = webpack(config, () => { resolve() });
  });



  function defaultSearchOptions () {
    return _defaultSearchOptions;
  }

  function search(text, options = {}) {
    return new Promise((resolve, reject) => {
      const {
        ns,
        lng,
        defaultNamespace,
        defaultLanguage
      } = deepmerge(_defaultSearchOptions, options);
      const cns = ns || defaultNamespace;
      const clng = lng || defaultLanguage;
      const keys = getResourceBundleKeys(cns);
      const resources = keys.map(key => {
        const val = i18next.t(`${ns}:${key}`, { lng });
        const cmp1 = Utils.text.normalize(val.toLowerCase());
        const cmp2 = Utils.text.normalize(text.toLowerCase());
        if(cmp1.includes(cmp2)){
          return {
            searchText: val,
            searchObject: {
              ns,
              key,
            }
          };
        }
      });

      resolve(resources.filter(v => v)); //remove undefined values before sending array
    });
  }

  function addNamespace(ns) {
    return new Promise(((resolve, reject) => {
      const ns_path = path.join(translationsDir, ns);
      const promises = [];
      fs.mkdir(path.join(translationsDir, ns), (err) => {
        if(err) {
          return reject(err);
        }

        namespaces.push(ns);
        for(const i in languages) {
          promises.push(saveJson(path.join(ns_path, `${languages[i]}.json`), {}));
        }
        Promise.all(promises)
          .then(() => {
            i18next.loadNamespaces([ns])
            resolve(ns);
          }).catch(err => reject(err));
      })
    }));
  }

  function addLanguage(lng) {
    return new Promise(((resolve, reject) => {
      const promises = [];
      for(const i in namespaces) {
        const p = path.join(translationsDir, namespaces[i], `${lng}.json`);
        promises.push(saveJson(p, {}));
      }
      config.languages.push(lng);
      promises.push(saveJson(path.join(__dirname, 'config.js')), config);
      Promise.all(promises).then(() => {
        i18next.loadLanguages(lng, err => {
          if (err) {
            return reject(err);
          }
          resolve(lng);
        });
      }).catch(err => {
        console.log(err);
        reject(err);
      });
    }));
  }

  function setTranslation(lng, key, value, ns) {
    return new Promise(((resolve, reject) => {

      const resourcePath = path.join(translationsDir, ns, `${lng}.json`);
      const obj = require(resourcePath);
      if (typeof value === 'string' || value instanceof String) {
        obj[key] = value;
      } else {
        obj[key] = deepmerge(obj[key], value);
      }
      i18next.addResource(lng, ns, key, obj[key]);
      saveJson(resourcePath, obj).then(() => resolve())
        .catch(err => reject(err));
      }));
  }
  function deletePropertyPath (origin, path) {
    let obj = origin;
    const parent = obj;
    if (!obj || !path) {
      return;
    }

    if (typeof path === 'string') {
      path = path.split('.');
    }

    for (let i = 0; i < path.length - 1; i++) {
      const parent = obj;
      obj = obj[path[i]];
      if (typeof obj === 'undefined') {
        return;
      }
    }

    delete obj[path.pop()];
    if(Object.keys(obj).length === 0) {
      return delete parent[path.pop()];
    }
  };
  function deleteTranslation(key, ns) {
    return new Promise(((resolve, reject) => {
      const proms = [];
      for (const i in languages) {
        const lng = languages[i];
        const resourcePath = path.join(translationsDir, ns, `${lng}.json`);
        const obj = require(resourcePath);

        deletePropertyPath(obj, key);
        proms.push(saveJson(resourcePath, obj));
      }
      Promise.all(proms)
        .then(() => {
          i18n.reloadResources(defaultLanguage, ns, () => {
            resolve()
          });
        }).catch(e => reject(e));
    }));
  }

   function getResourceBundle(ns, lng) {
    const resourcePath = path.join(translationsDir, ns, `${lng}.json`);
    return require(resourcePath);
  }

   function getResourceBundleKeys(ns) {
    const obj = getResourceBundle(ns, defaultLanguage);
    return flattenkeys(obj);
  }

}
