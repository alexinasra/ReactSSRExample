const path = require('path');
const flattenkeys = require('flattenkeys');
const { I18nTranslationKey } = require('../types');

module.exports = function i18nTranslationKeys (root, { namespace = 'common' }, { req }) {
    const translationsRootDir = req.i18n.options.backend.translationsRootDir;
    const languages = req.i18n.options.languages;
    const fallbackLng = req.i18n.options.fallbackLng[0];
    const objdefault = require(path.join(translationsRootDir, namespace, fallbackLng));
    const keys = flattenkeys(objdefault);
    return keys.map(k => new I18nTranslationKey(namespace, k))
}
