const camelToSnake = require('./camelToSnake');
const normalize = require('./normalize');
const normalizeArabic = require('./normalizeArabic');
const detectLanguage = require('./detectLanguage');
const generateString = require('./generateString');

module.exports = {
  camelToSnake,
  normalize,
  normalizeArabic,
  detectLanguage,
  generateString,
};

module.exports.default = module.exports;
