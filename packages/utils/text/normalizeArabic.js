module.exports = function normalizeArabicText(t) {
  let text = t;
  if (!text) return undefined;
  // remove special characters
  text = text.replace(/([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g, '');

  // normalize Arabic
  text = text.replace(/(آ|إ|أ)/g, 'ا');
  text = text.replace(/(ة)/g, 'ه');
  text = text.replace(/(ئ|ؤ)/g, 'ء');
  text = text.replace(/(ى)/g, 'ي');

  // convert arabic numerals to english counterparts.
  const starter = 0x660;
  for (let i = 0; i < 10; i += 1) {
    text.replace(String.fromCharCode(starter + i), String.fromCharCode(48 + i));
  }
  return text;
};
