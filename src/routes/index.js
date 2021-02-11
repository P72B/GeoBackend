const bodyParser = require('body-parser');

const { onRequest } = require('./logger');
const geo = require('./geo');
const mapsforge = require('./mapsforge');

// eslint-disable-next-line no-unused-vars
const onError = (result, req, res, next) => {
  if (result instanceof Error) {
    res.status(result.code);
  }
  if (result === null) {
    res.status(204);
  }
  res.json(result);
};

const putDelay = (ms) => (req, res, next) => {
  setTimeout(() => {
    next();
  }, ms);
};

module.exports = (app) => {
  app.use(onRequest);
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use('/geo', geo);
  app.use('/mapsforge', mapsforge);
  app.get('/', (req, res) => {
    res.send('Geo is up and running');
  });

  app.use(onError);
};
