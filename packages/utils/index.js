const text = require('./text');
const json = require('./json');
const object = require('./object');
const userDir = require('./user-dir');
module.exports = {
  text,
  json,
  object,
  userDir
};

module.exports.default = module.exports;
