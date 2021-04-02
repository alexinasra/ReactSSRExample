const detectLanguage = require('./detectLanguage');
const normalizeArabic = require('./normalizeArabic');

module.exports = function normalize(text) {
  if (!text) return undefined;
  const lng = detectLanguage(text);
  if (lng === 'ar') {
    return normalizeArabic(text);
  }
  return String(text).normalize('NFC');
};
