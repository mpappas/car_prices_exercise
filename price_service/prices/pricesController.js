'use strict';

const { getExternalPrice } = require('../helpers/externalApis');
const externalRequestsMap = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * GetPrice helper function
 * @return { NumberPlate: CarPrice }
 */
async function getPrice(numberPlate, skipCacheForRead = 'true') {
  let inFlightRequestFullfilled = false;
  // Check if record is in cache and return to avoid external request
  if (skipCacheForRead === 'false') {
    const cachedPrice = await cache.get(numberPlate);
    console.log(`Cached price for number plate ${numberPlate} is ${cachedPrice}`);
    if (cachedPrice) return { plateNumber: numberPlate, price: cachedPrice };
  }

  let inFlightRequest = externalRequestsMap.get(numberPlate);
  // Wait for a minute while a request has already been sent with status pending
  while (inFlightRequest === 'pending') {
    await sleep(500);
    // After waiting for a minute check again for the status of the request
    inFlightRequest = externalRequestsMap.get(numberPlate);
    if (!inFlightRequest) {
      inFlightRequestFullfilled = true;
      break;
    }
  }

  if (inFlightRequestFullfilled) {
    const cachedPrice = await cache.get(numberPlate);
    console.log(`Cached price for number plate ${numberPlate} is ${cachedPrice}`);
    if (cachedPrice) return { plateNumber: numberPlate, price: cachedPrice };
  }

  if (!inFlightRequest) {
    // Initial record of in-flight request
    externalRequestsMap.set(numberPlate, 'pending');
    // In case price hasn't been cached call external request helper function
    const externalRequest = await getExternalPrice(numberPlate);
    // and set the new record in cache for future refernce
    let cacheNewPrice = await cache.set(externalRequest.plateNumber, externalRequest.price);
    externalRequestsMap.delete(numberPlate);
    return externalRequest;
  }
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
