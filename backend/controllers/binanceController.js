const axios = require('axios');

const getserverTime = async (req, res) => {
     try {
          const response = await axios.get("https://api.binance.com/api/v1/time");
          const { serverTime } = await response.data;
          if (!!serverTime) {
               console.log(`Your server time is ${serverTime}`);
          }
          return res.status(200).send({ code: 200, serverTime })
     } catch (error) {
          console.log(error)
          return res.status(500).send({ code: 500, msg: "Internal Server Error" })
     }
}

module.exports = getserverTime;