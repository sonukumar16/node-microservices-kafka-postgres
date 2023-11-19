const express = require('express');
const bodyParser = require('body-parser');

const {dbConnection} = require('./db.connection');
const orderRouter = require('./routes/order.routes');
require("./kafka");

const app = express();
const port = 3002;

dbConnection();
app.use(bodyParser.json());
app.use('/order', orderRouter);

app.listen(port, () => {
  console.log(`Order service listening at http://localhost:${port}`);
});

