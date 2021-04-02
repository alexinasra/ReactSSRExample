function getLanguage(lang, i18n) {
  return i18n.getResource(lang, 'Language');
}

const resolvers = {
  Query: {
    language: (root, { lang }, {req}) => {
      const { i18n } = req;
      return getLanguage(lang, i18n);
    },
    languages: (root, args, {req}) => {
      const { i18n } = req;
      return i18n.options.languages.map((lang) => getLanguage(lang, i18n));
    },
    getLanguageInfo: (root, { lng }, { req }) => {
      return getLanguage(lng, req.i18n);
    },
    language: (root, args, {req}) => getLanguage(req.i18n.languages[0], req.i18n),
    translate: async function (root, { key, options: { ns, lng } }, { req }) {
      console.log(req.i18n.t(`${ns}:${key}`, { lng }))
      return await req.i18n.t(`${ns}:${key}`, { lng });
    }
  },
  Mutation: {
    setLanguage: (root, { lang }, {req}) => req.i18n.changeLanguage(lang).then(() => getLanguage(lang, req.i18n)),

  },
  Language: {
    short: (root) => root.language_short,
    long: (root) => root.language_long,
    dir: (root) => root.text_direction,
    native: (root) => root.language_native,
  },
};

module.exports = resolvers;
