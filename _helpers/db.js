const mongoose = require("mongoose");

const keysDb = require('./dbConfig').mongoURI;

mongoose
    .connect(keysDb, { useNewUrlParser: true })
    .then(() => console.log('MongoDb connected'))
    .catch(err => console.log(err));

module.exports = {
    // Models
    User: require('../models/user/user.model'),
    Requests: require('../models/requests/request.model')
};