const path = require('path');

module.exports = {
  translationsDir: path.join(__dirname, "../../translations"),
  languages: ['en', 'ar', 'he'],
  defaultLanguage: 'en',
  defaultNamespace: 'common'
}
