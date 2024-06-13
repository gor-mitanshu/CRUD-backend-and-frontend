const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();
require('./config/db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const cityRoute = require('./routes/cityRoute');
const binanceRoute = require('./routes/binanceRoute');
const userRoute = require('./routes/userRoute');

app.use('/', cityRoute);
app.use('/binance', binanceRoute);
app.use('/user', userRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
     console.log(`Connected to port ${PORT}`);
});