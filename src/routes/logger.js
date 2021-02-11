const { loggers } = require('winston');

const logger = loggers.get('server');

const onRequest = (req, res, next) => {
  logger.info(`${req.method}, ${req.url}`);
  next();
};

module.exports = {
  onRequest,
};
