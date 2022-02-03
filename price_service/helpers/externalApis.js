const axios = require('axios');
const externalRequestsMap = new Map();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Prices 3rd party API
 * @return { NumberPlate: CarPrice }
 */
async function getExternalPrice(numberPlate) {
  try {
    let inFlightRequest = externalRequestsMap.get(numberPlate);
    // Wait for a minute while a request has already been sent with status pending
    while (inFlightRequest === 'pending') {
      sleep(6000);
      // After waiting for a minute check again for the status of the request
      inFlightRequest = externalRequestsMap.get(numberPlate);
      break;
    }

    if (inFlightRequest && inFlightRequest != 'pending') {
      return { plateNumber: numberPlate, price: inFlightRequest };
    }

    // First time request
    if (!inFlightRequest) {
      // Initial record of in-flight request
      externalRequestsMap.set(numberPlate, 'pending');
      const response = await axios.get(`http://localhost:3000/${numberPlate}`);
      // Initial record of in-flight request's value with price
      externalRequestsMap.set(numberPlate, response.data.price);
      return response.data;
    }
  } catch (error) {
    console.error('Error retrieving price for the specified numer plate', error);
  }
}

module.exports = { getExternalPrice };
