const mongoose = require('mongoose');

const userSChema = new mongoose.Schema({
     name: { type: String, required: true },
     city: { type: String, required: true },
     mobile: { type: String },
     mediaUrl: { type: String, },
     id: { type: Number, required: true }
});

module.exports = mongoose.model('User', userSChema);