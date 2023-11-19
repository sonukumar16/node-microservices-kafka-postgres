const express = require('express');
const bodyParser = require('body-parser');

const { dbConnection } = require('./db.connection');
const userRouter = require('./routes/user.routes');

require("./kafka");
const app = express();
const port = 3000;

dbConnection();
app.use(bodyParser.json());
app.use('/user', userRouter);

app.listen(port, () => {
  console.log(`user service listening at http://localhost:${port}`);
});

