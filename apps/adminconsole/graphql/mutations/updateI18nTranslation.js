const path = require('path');

const utils = require('@react-ssrex/utils');
const saveJson = utils.json.saveJson;
const { deepValue, deepValueUpdate, deletePropertyPath} = utils.object;
const { I18nTranslationKey, I18nTranslationValue } = require('../types');


module.exports = async function updateI18nTranslation (root, { input }, { req }) {
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
    deepValueUpdate(obj, key, value);
    req.i18n.addResource(language, namespace, key, value);
  }

  await saveJson(resourcePath, obj)
  const translationKey = new I18nTranslationKey(namespace, key);
  const otherLngs = req.i18n.options.languages.filter(l => l !== language);

  const tValues = otherLngs.map(l => {
    const otherPath = path.join(translationsRootDir, namespace, `${l}.json`);
    const otherObj = require(otherPath);
    const otherValue = deepValue(otherObj, key);

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
}
