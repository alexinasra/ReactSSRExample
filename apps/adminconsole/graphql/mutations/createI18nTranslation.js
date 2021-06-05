const path = require('path');

const utils = require('@react-ssrex/utils');
const saveJson = utils.json.saveJson;
const { deepValue} = utils.object;
const { I18nTranslationKey } = require('../types');

module.exports = async function createI18nTranslation (root, { input }, { req }) {
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
  deepValueUpdate(obj, key, '');
  await saveJson(fallbackResourcePath, obj)
  req.i18n.addResource(fallbackLng, namespace, key, '');

  return {
    created: true,
    translationKey: new I18nTranslationKey(namespace, key)
  }
}
