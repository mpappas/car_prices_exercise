const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const responseTime = require('response-time');

const pricesRouter = require('./routes/pricesRouter');
require('./cacheManager');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('combined'));
app.use(responseTime());

app.use(express.json());

app.use('/', pricesRouter);

app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Car Prices Service');
});

module.exports = app;
