const langdic = require('./langdic');

module.exports = function detectTextLanguage(text) {
  const keys = Object.keys(langdic);

  for (let i = 0; i < keys.length; i += 1) {
    if (langdic[keys[i]].test(text) === true) { // Check Unicode to see which one is true
      return keys[i];
    }
  }
  return 'en';
};
