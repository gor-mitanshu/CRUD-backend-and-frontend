const mongoose = require('mongoose');

const citySChema = new mongoose.Schema({
     name: {
          type: String, required: true, unique: true
     }
});

module.exports = mongoose.model('City', citySChema);