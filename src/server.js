const express = require('express');
const { loggers } = require('winston');
require('./logger');
const setupRouters = require('./routes');
const { getCurrentAddresses } = require('./utils');

const port = 5002;
const app = express();
const logger = loggers.get('server');

setupRouters(app);

app.listen(port, () => {
  const url = `${getCurrentAddresses()}:${port}`;
  logger.info(`App listening on: ${url}`);
  logger.info(`Please set the config as on your app

  cloud_base_url.http://${url}/geo/

`);
});
