'use strict';

const { getExternalPrice } = require('../helpers/externalApis');

async function getPrice(numberPlate, skipCacheForRead = true) {
  if (skipCacheForRead === false) {
    console.log('I am here');
    const cachedPrice = await cache.get(numberPlate);
    console.log(`Cached price for number plate ${numberPlate} is ${cachedPrice}`);
    if (cachedPrice) return { plateNumber: numberPlate, price: cachedPrice };
  }

  const externalRequest = await getExternalPrice(numberPlate);
  let cacheNewPrice = await cache.set(externalRequest.plateNumber, externalRequest.price);
  console.log('Cache', cacheNewPrice);
  return externalRequest;
}

async function httpGetCarPrice(req, res) {
  const numberPlate = req.params.id;
  let skipCache = req.params.cache;

  console.log("Prices Controller - I've been called");
  return res.status(200).json(await getPrice(numberPlate, skipCache));
}

module.exports = { httpGetCarPrice };
