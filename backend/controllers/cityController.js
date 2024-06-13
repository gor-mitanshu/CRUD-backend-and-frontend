require('dotenv').config();

const citySchema = require('../models/citySchema');

const cityController = {
     addCity: async (req, res) => {
          const { name } = req.body;
          if (!name) {
               return res.status(300).send({ code: 300, msg: "City name is required" });
          }
          if (!name.match(/^[A-Za-z]+$/)) {
               return res.status(300).send({ code: 300, msg: "City name contains numeric characters" });
          }
          const exisitingCity = await citySchema.findOne({ name });
          if (exisitingCity) {
               return res.status(300).send({
                    code: 300, msg: "City already exists"
               })
          }
          try {
               const city = new citySchema({ name });
               await city.save();
               return res.status(200).send({ code: 200, msg: "City name inserted " });
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     },
     getCity: async (req, res) => {
          try {
               const getAllCities = await citySchema.find({});
               return res.status(200).send({ code: 200, getAllCities });
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     }
};

module.exports = cityController;