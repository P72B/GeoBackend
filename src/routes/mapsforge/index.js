const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

router.get('/liechtenstein.map', (req, res) => {
  res.sendFile(`${__dirname}/data/liechtenstein.map`);
});
router.get('/berlin.map', (req, res) => {
  res.sendFile(`${__dirname}/data/berlin.map`);
});

module.exports = router;
