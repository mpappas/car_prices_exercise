const axios = require('axios');

/**
 * Prices 3rd party API
 * @return { NumberPlate: CarPrice }
 */
async function getExternalPrice(numberPlate) {
  try {
    const response = await axios.get(`http://localhost:3000/${numberPlate}`);
    return response.data;
  } catch (error) {
    console.error('Error retrieving price for the specified numer plate', error);
  }
}

module.exports = { getExternalPrice };
