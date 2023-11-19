const express = require('express');
const bodyParser = require('body-parser');

const productRoute = require("./routes/product.routes");
const {dbConnection} = require('./db.connection');

const app = express();
const port = 3001;

dbConnection();
app.use(bodyParser.json());
app.use('/product', productRoute);

app.listen(port, () => {
  console.log(`Product service listening at http://localhost:${port}`);
});
