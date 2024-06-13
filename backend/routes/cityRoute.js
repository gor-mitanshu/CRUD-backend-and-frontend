const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController')

router.post('/addCity', cityController.addCity);
router.get('/getCities', cityController.getCity);

module.exports = router;