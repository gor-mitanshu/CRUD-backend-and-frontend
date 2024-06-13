const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`${process.env.MONGO_URL}/${process.env.MONGO_DB_NAME}`).then(() => {
     console.log(`Connection Established with DB`);
}).catch(err => console.log(err.message));