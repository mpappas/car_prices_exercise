const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

const port = 3000;

const generatePrice = (numberPlate) => {
  const randomPrice = Math.floor(1000 + Math.random() * 9000);
  const carPrice = { [numberPlate]: randomPrice };
  return carPrice;
};

app.use(morgan('combined'));
app.use(cors());

app.get('/:id', function (req, res) {
  const numberPlate = req.params.id;
  console.log(numberPlate);
  res.status(200).json(generatePrice(numberPlate));
});

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});
