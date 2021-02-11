const winston = require('winston');

const { format } = winston;
const { combine, timestamp, label, json } = format;

const filename = './logs/combined.log';
[
  {
    id: 'server',
    label: 'nodejs server',
    service: 'core-service',
  },
  {
    id: 'geo',
    label: 'osrm api',
    service: 'geo-service',
  },
].forEach((logger) => {
  winston.loggers.add(logger.id, {
    defaultMeta: { service: logger.service },
    transports: [
      new winston.transports.Console({
        level: 'debug',
        format: combine(
          label({ label: logger.label }),
          timestamp(),
          format.colorize(),
          format.simple(),
        ),
      }),
      new winston.transports.File({
        filename,
        format: combine(
          timestamp(),
          format.splat(),
          label({ label: logger.label }),
          json(),
        ),
      }),
    ],
  });
});
