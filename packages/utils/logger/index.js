const winston = require('winston');
const PubSub = require('apollo-server').PubSub

const LoggerPubSub = new PubSub();

function createLogger(defaultMeta, level='info') {
  const logger = winston.createLogger({
    level: 'info',
    defaultMeta,
    format: winston.format.json(),
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({
        filename: 'log/error.log',
        level: 'error'
      }),
      new winston.transports.File({
        filename: 'log/output.log'
      }),
    ],
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  logger.stream({
    start: -1
  }).on('log', function(log) {
    LoggerPubSub.publish('LOG_EVENT', {
      incommingLog: log
    });
  });
  return logger;
}
module.exports = {
  LoggerPubSub,
  createLogger
};
