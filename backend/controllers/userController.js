require('dotenv').config();
const userSchema = require('../models/userSchema');
const citySchema = require('../models/citySchema');

const userController = {
     addUser: async (req, res) => {
          const { name, city, mobile, mediaUrl } = req.body;

          if (!name) {
               return res.status(300).send({ code: 300, msg: "Name is required" });
          }
          if (!name.match(/^[A-Za-z]+$/)) {
               return res.status(300).send({ code: 300, msg: "Name contains numeric characters" });
          }

          if (!city) {
               return res.status(300).send({ code: 300, msg: "City name is required" });
          }
          const exisitingCity = await citySchema.findOne({ name: city });
          if (!exisitingCity) {
               return res.status(300).send({ code: 300, msg: "City not found" })
          }

          if (mobile && !mobile.match(/^[0-9]+$/)) {
               return res.status(300).send({ code: 300, msg: "Mobile contains non-numeric characters" });
          }

          if (mediaUrl && !mediaUrl.startsWith("https://")) {
               return res.status(300).send({ code: 300, msg: "Media URL starts with 'https://' only" })
          }
          try {
               const id = req.serverTime;

               const user = new userSchema({ name, city, mobile, mediaUrl, id });
               await user.save();
               return res.status(200).send({ code: 200, msg: "User inserted " });
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     },

     getUsers: async (req, res) => {
          try {
               const users = await userSchema.find({});
               return res.status(200).send({ code: 200, users });
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     },

     getUserById: async (req, res) => {
          const { id } = req.params;
          try {
               const user = await userSchema.findOne({ _id: id });
               return res.status(200).send({ code: 200, user });
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     },

     updateUserById: async (req, res) => {
          const { id } = req.params;
          try {
               const { name, city, mobile, mediaUrl } = req.body;
               const updatedFields = { name, city, mobile, mediaUrl };
               const updateUser = await userSchema.findByIdAndUpdate(
                    { _id: id },
                    { $set: updatedFields },
                    { new: true }
               );
               if (updateUser) {
                    return res.status(200).send({ code: 200, msg: "User updated successfully" })
               } else {
                    return res.status(300).send({ code: 300, msg: "User updated unsuccessfully" })
               }
          } catch (error) {
               return res.status(500).send({ code: 500, msg: "Internal Server Error" })
          }
     }
}
module.exports = userController;