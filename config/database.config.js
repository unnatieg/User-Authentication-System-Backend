const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('DB CONNECTED');
    })
    .catch((err) => {
        console.log('Error connecting to DB: ', err);
    });

// Exporting mongoose so it can be reused in other files
module.exports = connection;
