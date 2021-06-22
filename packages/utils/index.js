const text = require('./text');
const json = require('./json');
const object = require('./object');
const logger = require('./logger');
const userDir = require('./user-dir');
module.exports = {
  text,
  json,
  object,
  userDir,
  logger
};

module.exports.default = module.exports;
