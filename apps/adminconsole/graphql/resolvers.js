const path = require('path');
const fs = require('fs');
const deepmerge = require('deepmerge');
const flattenkeys = require('flattenkeys');

const utils = require('@foodle/utils');
const saveJson = utils.json.saveJson;

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
}

module.exports = {
  Query: {
    i18nNamespaces: (root, args, { req }) => {
      return req.i18n.options.ns
    },
    i18nNamespaceKeys: async (root, { ns }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const obj_path = path.join(translationsRootDir, ns, "en");
      const obj = require(obj_path);
      return flattenkeys(obj);
    }
  },
  Mutation: {
    i18nCreateNamespace: async (root, { ns }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const ns_path = path.join(translationsRootDir, ns);

      try {
        await fs.mkdirSync(ns_path)
      } catch(err) {
        return "BOOKED_NAMESPACE";
      }
      req.i18n.options.languages.map(async (lng) => {
        await saveJson(path.join(ns_path, `${lng}.json`), {});
      });

      await req.i18n.loadNamespaces([ns]);
      return "SUCCESS"
    },
    i18nDropNamespace: async (root, { ns }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const ns_path = path.join(translationsRootDir, ns);
      if(!fs.existsSync(ns_path)) {
        return "MISSING_NAMESPACE";
      }
      fs.rmdirSync(ns_path, { recursive: true });
      req.i18n.options.ns = req.i18n.options.ns.filter((o) => o !==ns);
      await req.i18n.removeNamespace(ns);
      return "SUCCESS";
    },
    i18nSetTranslation: async (root, { key, ns, value, lng }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const clng = lng || req.i18n.options.fallbackLng;
      const resourcePath = path.join(translationsRootDir, ns, `${clng}.json`);
      const obj = require(resourcePath);
      const keyPath = key.split('.');

      let cur = obj;
      for (let i = 0; i < keyPath.length; i += 1) {
        cur[keyPath[i]] = (i >= keyPath.length - 1) ? value : (cur[keyPath[i]] || {});
        cur = cur[keyPath[i]];
      }

      req.i18n.addResource(clng, ns, key, cur);
      await saveJson(resourcePath, obj)
      return "SUCCESS";
    },
    i18nDropTranslation: async (root, { key, ns }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      await req.i18n.options.languages.forEach(async (lng, i) => {
        const resourcePath = path.join(translationsRootDir, ns, `${lng}.json`);
        const obj = require(resourcePath);
        deletePropertyPath(obj, key);
        await saveJson(resourcePath, obj);
      });

      await req.i18n.reloadResources(null, ns);
      return "SUCCESS";
    },
    i18nClearTranslation: async (root, { key, ns, lng }, { req }) => {
      const translationsRootDir = req.i18n.options.backend.translationsRootDir;
      const resourcePath = path.join(translationsRootDir, ns, `${lng}.json`);
      const obj = require(resourcePath);
      deletePropertyPath(obj, key);
      await saveJson(resourcePath, obj);
      await req.i18n.removeResourceBundle(lng, ns);
      await req.i18n.reloadResources(lng, ns);
      return "SUCCESS";
    }
  }
};
