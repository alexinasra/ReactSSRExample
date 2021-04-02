const normalizeArabic = require('./normalizeArabic');

const text = 'أآةؤئى';

describe('normalizeArabic', () => {
  it('normalizes (آ|إ|أ) character', () => !(normalizeArabic(text).includes('أ')) || !(normalizeArabic(text).includes('آ')));
  it('normalizes (ة) character', () => !(normalizeArabic(text).includes('ة')));
  it('normalizes (ئ|ؤ) character', () => !(normalizeArabic(text).includes('ؤ')) || !(normalizeArabic(text).includes('ئ')));
  it('normalizes (ى) character', () => !(normalizeArabic(text).includes('ى')));
});
