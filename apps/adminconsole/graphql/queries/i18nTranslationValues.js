const path = require('path');
const flattenkeys = require('flattenkeys');
const getI18nTranslationValue = require('./i18nTranslationValue');

module.exports = function i18nTranslationValues (root, { namespace, language }, { req }) {
  const translationsRootDir = req.i18n.options.backend.translationsRootDir;
  const languages = req.i18n.options.languages;
  const fallbackLng = req.i18n.options.fallbackLng[0];
  const keysObj = require(path.join(translationsRootDir, namespace, fallbackLng));
  const keys = flattenkeys(keysObj);
  return keys.map(key => i18nTranslationValue(root, { namespace, language, key }, { req }));
}
