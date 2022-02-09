const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const port = 3000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());

const generatePrice = async (numberPlate) => {
  const randomPrice = Math.floor(1000 + Math.random() * 9000);
  const carPrice = { plateNumber: numberPlate, price: randomPrice };
  await sleep(10000);
  console.log(`Car price ${carPrice}`);
  return carPrice;
};

app.get('/:id', async (req, res) => {
  const numberPlate = req.params.id;
  res.status(200).json(await generatePrice(numberPlate));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
