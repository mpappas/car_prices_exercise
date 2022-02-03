const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const port = 3000;

app.use(morgan('combined'));
app.use(cors());

const generatePrice = (numberPlate) => {
  const randomPrice = Math.floor(1000 + Math.random() * 9000);
  const carPrice = { plateNumber: numberPlate, price: randomPrice };
  console.log(`Car price ${carPrice}`);
  return carPrice;
};

app.get('/:id', function (req, res) {
  const numberPlate = req.params.id;
  res.status(200).json(generatePrice(numberPlate));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
