const path = require('path');

const utils = require('@react-ssrex/utils');
const saveJson = utils.json.saveJson;
const { deletePropertyPath} = utils.object;
const { I18nTranslationKey } = require('../types');

module.exports = async function dropI18nTranslation (root, {
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
}
