const path = require('path');
const flattenkeys = require('flattenkeys');
const utils = require('@react-ssrex/utils');
const { deepValue } = utils.object;

const { I18nTranslationKey, I18nTranslationValue } = require('../types');

module.exports = function i18nTranslationValue(root, {
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

  const actualValue = deepValue(valuesObj, key)
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
