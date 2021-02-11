const logger = require('winston').loggers.get('geo');
const express = require('express');

const router = express.Router();
const Transformer = require('./main/transformer');
const OsrmFetcher = require('./main/osrmFetcher');

const osrmFetcher = new OsrmFetcher.OsrmFetcher();

router.get('/directions/json', async (req, res) => {
  const { origin } = req.query;
  const { destination } = req.query;
  const { mode } = req.query;
  const { channel } = req.query;
  const { key } = req.query;
  await osrmFetcher
    .getRoute(mode, origin, destination)
    .then((osrmResponseString) => {
      const osrmResponse = JSON.parse(osrmResponseString);
      if (osrmResponse != null) {
        logger.info(`channel: ${channel}, key: ${key}, mode: ${mode}`);
        res.status(200).send(Transformer.osrm2google(osrmResponse));
      } else {
        logger.warn('directions resolving error');
        res.status(500).send({
          error: {
            message: 'internalServerError',
            details: {
              errors: [
                { message: 'An internal server error occurred.', code: 9999 },
              ],
            },
          },
        });
      }
    })
    .catch((err) => {
      logger.error('route request error', err);
      res.status(500).send({
        error: {
          message: 'internalServerError',
          details: {
            errors: [
              { message: 'An internal server error occurred.', code: 9999 },
            ],
          },
        },
      });
    });
});

router.get('/geocode/json', (req, res) => {
  res.status(200).send({});
});

router.get('/autocomplete', (req, res) => {
  res.status(200).send({});
});

module.exports = router;
