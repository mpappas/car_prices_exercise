'use strict';

const express = require('express');

const { httpGetCarPrice } = require('../prices/pricesController');

const pricesRouter = express.Router();

pricesRouter.get('/cars/price/:id', httpGetCarPrice);

module.exports = pricesRouter;
