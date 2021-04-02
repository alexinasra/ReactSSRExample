import i18n from 'i18next';
import Fetch from 'i18next-fetch-backend';

const deepmerge = require('deepmerge');

const defaultOptions = {
  translationsRootUrl: '/translations',
  defaultLngUrl: '/translations/default-language',
  languagesUrl: '/translations/languages',
  namespacesUrl: '/translations/namespaces',
};

function setupI18n(options = {}, ...middlewares) {
  const opts = deepmerge(defaultOptions, options);
  return new Promise(((resolve, reject) => {
    Promise.all([
      fetch(opts.languagesUrl).then((resp) => resp.json()),
      fetch(opts.namespacesUrl).then((resp) => resp.json()),
      fetch(opts.defaultLngUrl).then((resp) => resp.json()),
    ]).then((data) => {
      const languages = data[0];
      const namespaces = data[1];
      const defaultLng = data[2];
      const mds = [...middlewares];
      for (let i = 0; i < mds.length; i += 1) {
        i18n.use(mds[i]);
      }
      resolve(
        i18n
          .use(Fetch)
          .init({
            debug: false,
            backend: {
            // path where resources get loaded from
              loadPath: `${opts.translationsRootUrl}/{{ns}}/{{lng}}.json`,

              // path to post missing resources
              addPath: `${opts.translationsRootUrl}/{{ns}}/missing.json`,
              requestOptions: {
                cache: 'no-cache',
              },
            },
            react: {
              fallbackLng: defaultLng,
            },
            detection: opts.detectionOptions,
            cache: false,
            ns: namespaces,
            defaultNs: 'common',
            defaultNS: 'common',
            fallbackLng: defaultLng,
            load: 'languageOnly',
            preload: languages,
            // whitelist: languages,
            languages,
            // saveMissing: true,
            returnObjects: true,
          })
          .then(() => {
            const handleChange = (lng) => {
              document.documentElement.lang = lng;
              document.documentElement.dir = i18n.dir(lng);
            };
            handleChange(i18n.language);
            i18n.on('languageChanged', handleChange);
            return i18n;
          }),
      );
    }).catch((err) => reject(err));
  }));
}

export default i18n;
export {
  setupI18n,
};
