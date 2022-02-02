'use strict';

const { getExternalPrice } = require('../helpers/externalApis');

async function httpGetCarPrice(req, res) {
  const numberPlate = req.params.id;
  console.log("Prices Controller - I've been called");
  return res.status(200).json(await getExternalPrice(numberPlate));
}

module.exports = { httpGetCarPrice };
