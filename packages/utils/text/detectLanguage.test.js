const detectLanguage = require('./detectLanguage');

describe('detectLanguage', () => {
  it('detects Arabic', () => 'en' === detectLanguage('العربيه'));
  it('detects Hebrew', () => 'en' === detectLanguage('עברית'));
  it('detects Engilsh', () => 'en' === detectLanguage('English'));
});
