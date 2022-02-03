'use strict';

const { getExternalPrice } = require('../helpers/externalApis');

/**
 * GetPrice helper function
 * @return { NumberPlate: CarPrice }
 */
async function getPrice(numberPlate, skipCacheForRead = true) {
  // Check if record is in cache and return to avoid external request
  if (skipCacheForRead === false) {
    const cachedPrice = await cache.get(numberPlate);
    console.log(`Cached price for number plate ${numberPlate} is ${cachedPrice}`);
    if (cachedPrice) return { plateNumber: numberPlate, price: cachedPrice };
  }

  // In case price hasn't been cached call external request helper function
  const externalRequest = await getExternalPrice(numberPlate);
  // and set the new record in cache for future refernce
  let cacheNewPrice = await cache.set(externalRequest.plateNumber, externalRequest.price);
  return externalRequest;
}

/**
 * GET Request handler
 * @return response status + { NumberPlate: CarPrice }
 */
async function httpGetCarPrice(req, res) {
  const numberPlate = req.params.id;
  let skipCache = req.params.cache;

  return res.status(200).json(await getPrice(numberPlate, skipCache));
}

module.exports = { httpGetCarPrice };
