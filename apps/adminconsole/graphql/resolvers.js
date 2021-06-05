const path = require('path');
const fs = require('fs');
const deepmerge = require('deepmerge');
const flattenkeys = require('flattenkeys');

const utils = require('@react-ssrex/utils');
const saveJson = utils.json.saveJson;


class I18nTranslationKey {
  constructor(namespace, key) {
    this._namespace = namespace;
    this._key = key;
  }

  get id () {
    return `${this._namespace}-${this._key.replace('.','_')}`;
  }

  get namespace () {
    return this._namespace;
  }
  get key () {
    return this._key;
  }
}

class I18nTranslationValue {
  constructor(translationKey, language, actualValue, value) {
    this._translationKey = translationKey;
    this._language = language;
    this._actualValue = actualValue;
    this._value = value;
  }

  get id () {
    return `${this._translationKey.id}-${this._language}`;
  }
  get translationKey() {
    return this._translationKey;
  }
  get language() {
    return this._language;
  }
  get actualValue() {
    return this._actualValue;
  }
  get value() {
    return this._value;
  }
}

function deletePropertyPath(origin, path) {
  let obj = origin;
  const parent = obj;
  if (!obj || !path) {
    return;
  }

  path = path.split('.');

  for (let i = 0; i < path.length - 1; i++) {
    const parent = obj;
    obj = obj[path[i]];
    if (typeof obj === 'undefined') {
      return;
    }
  }

  delete obj[path.pop()];
  if (Object.keys(obj).length === 0) {
    return delete parent[path.pop()];
  }
}

function deep_value(obj, key) {
  for (var i = 0, path = key.split('.'), len = path.length; i < len; i++) {
    obj = obj[path[i]];
    if (obj === undefined) {
      return undefined;
    }
  };
  return obj;
};

function deep_value_update(obj, key, value) {
  for (let i = 0, path = key.split('.'), len = path.length; i < len; i++) {
    obj[path[i]] = (i >= path.length - 1) ? value : (obj[path[i]] || {});
    obj = obj[path[i]];
  }
  return obj;
};
function getI18nTranslationValue(root, {
  namespace,
  key,
  language,
}, {
  req
}) {
  const translationKey = new I18nTranslationKey(namespace, key);
  const translationsRootDir = req.i18n.options.backend.translationsRootDir;
  const languages = req.i18n.options.languages;
  const fallbackLng = req.i18n.options.fallbackLng[0];
  const keysObj = require(path.join(translationsRootDir, namespace, fallbackLng));
  const valuesObj = fallbackLng === language ? keysObj : require(path.join(translationsRootDir, namespace, language));
  const keys = flattenkeys(keysObj);

  const actualValue = deep_value(valuesObj, key)
  const value = req.i18n.t(`${namespace}:${key}`, {
    lng: language
  });

  return new I18nTranslationValue(
    translationKey,
    language,
    actualValue,
    value
  );
}
module.exports = {
  Query: {
    i18nNamespaces: (root, args, {
      req
    }) => {
      return req.i18n.options.ns
    },
    i18nTranslationKeys: async (root, {
      namespace = 'common'
    }, {
      req
    }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const languages = req.i18n.options.languages;
      const fallbackLng = req.i18n.options.fallbackLng[0];
      const objdefault = require(path.join(translationsRootDir, namespace, fallbackLng));
      const keys = flattenkeys(objdefault);
      return keys.map(k => new I18nTranslationKey(namespace, k))
    },
    i18nTranslationValue: getI18nTranslationValue,
    i18nTranslationValues: (root, {
      namespace,
      language
    }, {
      req
    }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const languages = req.i18n.options.languages;
      const fallbackLng = req.i18n.options.fallbackLng[0];
      const keysObj = require(path.join(translationsRootDir, namespace, fallbackLng));
      const keys = flattenkeys(keysObj);
      return keys.map(key => getI18nTranslationValue(root, { namespace, language, key }, { req }));
    }
  },
  Mutation: {
    createI18nNamespace: async (root, {
      namespace
    }, {
      req
    }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const ns_path = path.join(translationsRootDir, namespace);

      try {
        await fs.mkdirSync(ns_path)
      } catch (err) {
        return {
          created: false,
          namespace,
          error: "duplicate namespace."
        };
      }
      req.i18n.options.languages.map(async (lng) => {
        await saveJson(path.join(ns_path, `${lng}.json`), {});
      });

      await req.i18n.loadNamespaces([namespace]);
      return {
        created: true,
        namespace
      }
    },
    dropI18nNamespace: async (root, {
      namespace
    }, {
      req
    }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const ns_path = path.join(translationsRootDir, namespace);
      if (!fs.existsSync(ns_path)) {
        return {
          dropped: false,
          namespace,
          error: "namespace not found."
        };
      }
      fs.rmdirSync(ns_path, {
        recursive: true
      });
      req.i18n.options.ns = req.i18n.options.ns.filter((o) => o !== namespace);
      await req.i18n.removeNamespace(namespace);
      return {
        dropped: true,
        namespace
      }
    },
    createI18nTranslation: async (root, {
      input
    }, {
      req
    }) => {
      const {
        namespace,
        key,
      } = input;

      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const fallbackLng = req.i18n.options.fallbackLng[0];

      const fallbackResourcePath = path.join(
        translationsRootDir,
        namespace,
        `${fallbackLng}.json`);

      const obj = require(fallbackResourcePath);
      deep_value_update(obj, key, '');
      await saveJson(fallbackResourcePath, obj)
      req.i18n.addResource(fallbackLng, namespace, key, '');

      return {
        created: true,
        translationKey: new I18nTranslationKey(namespace, key)
      }
    },
    updateI18nTranslation: async (root, {
      input
    }, {
      req
    }) => {
      let {
        language,
        namespace,
        key,
        value,
      } = input;

      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const resourcePath = path.join(translationsRootDir, namespace, `${language}.json`);
      const obj = require(resourcePath);
      if (value === '') {
        value = undefined
        deletePropertyPath(obj, key);
        await req.i18n.reloadResources(null, namespace);
        req.i18n.addResource(language, namespace, key, undefined);
      } else {
        deep_value_update(obj, key, value);
        req.i18n.addResource(language, namespace, key, value);
      }

      await saveJson(resourcePath, obj)
      const translationKey = new I18nTranslationKey(namespace, key);
      const otherLngs = req.i18n.options.languages.filter(l => l !== language);

      const tValues = otherLngs.map(l => {
        const otherPath = path.join(translationsRootDir, namespace, `${l}.json`);
        const otherObj = require(otherPath);
        const otherValue = deep_value(otherObj, key);

        return new I18nTranslationValue(
          translationKey,
          l,
          otherValue,
          req.i18n.t(`${namespace}:${key}`, { lng: l })
        )

      });

      return {
        updated: true,
        translationValues: [
          new I18nTranslationValue(
            translationKey,
            language,
            value,
            req.i18n.t(`${namespace}:${key}`, { lng: language })
          ),
          ...tValues
        ]
      }
    },
    dropI18nTranslation: async (root, {
      input
    }, {
      req
    }) => {
      const {
        namespace,
        key,
      } = input;

      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      await req.i18n.options.languages.forEach(async (lng, i) => {
        const resourcePath = path.join(translationsRootDir, namespace, `${lng}.json`);
        const obj = require(resourcePath);
        deletePropertyPath(obj, key);
        await saveJson(resourcePath, obj);
      });

      await req.i18n.reloadResources(null, namespace);
      return {
        dropped: true,
        translationKey: new I18nTranslationKey(namespace, key)
      };
    },
  }
};
