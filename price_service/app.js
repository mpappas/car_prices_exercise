const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const keys = require('./config/keys');

const pricesRouter = require('./routes/pricesRouter');

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(morgan('combined'));

app.use(express.json());

app.use('/', pricesRouter);

app.get('/', (req, res) => {
  // eslint-disable-next-line no-tabs
  res.status(200).send('Welcome to the Car Prices Service');
});

module.exports = app;
