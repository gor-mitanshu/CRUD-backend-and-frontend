const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const axios = require('axios');


const getInivisideId = async (req, res, next) => {
     try {
          const response = await axios.get('https://api.binance.com/api/v1/time');
          const { serverTime } = await response.data;
          if (!serverTime) {
               return res.status(300).send({ code: 300, msg: "Invalid server time" })
          }
          req.serverTime = serverTime;
          next()
     } catch (error) {
          console.log(error)
     }
}

router.post('/addUser', getInivisideId, userController.addUser);
router.get('/getUsers', userController.getUsers);
router.get('/getUser/:id', userController.getUserById);
router.put('/updateUser/:id', userController.updateUserById);

module.exports = router;