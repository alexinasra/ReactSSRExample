module.exports = class I18nTranslationKey {
  constructor(namespace, key) {
    this._namespace = namespace;
    this._key = key;
  }

  get id () {
    return `${this._namespace}-${this._key.replace('.','_')}`;
  }

  get namespace () {
    return this._namespace;
  }
  get key () {
    return this._key;
  }
}
