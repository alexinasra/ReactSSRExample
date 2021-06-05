module.exports = class I18nTranslationValue {
  constructor(translationKey, language, actualValue, value) {
    this._translationKey = translationKey;
    this._language = language;
    this._actualValue = actualValue;
    this._value = value;
  }

  get id () {
    return `${this._translationKey.id}-${this._language}`;
  }
  get translationKey() {
    return this._translationKey;
  }
  get language() {
    return this._language;
  }
  get actualValue() {
    return this._actualValue;
  }
  get value() {
    return this._value;
  }
}
