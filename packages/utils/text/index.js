const camelToSnake = require('./camelToSnake');
const normalize = require('./normalize');
const normalizeArabic = require('./normalizeArabic');
const detectLanguage = require('./detectLanguage');

module.exports = {
  camelToSnake,
  normalize,
  normalizeArabic,
  detectLanguage,
};

module.exports.default = module.exports;
