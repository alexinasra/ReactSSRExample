const winston = require('winston');

const now = Date.now()
const logger = new winston.createLogger({
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: `log/output-${now}.log`
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ],
});

module.exports = logger;
