const express = require('express');
const router = express.Router();
const binanceController = require('../controllers/binanceController')

router.get('/time', binanceController);

module.exports = router;