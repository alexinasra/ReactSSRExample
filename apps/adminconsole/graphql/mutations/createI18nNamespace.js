const path = require('path');
const fs = require('fs');
const utils = require('@react-ssrex/utils');

const { saveJson } = utils.json;


module.exports = async function createI18nNamespace(root, { namespace }, { req }) {
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
}
