const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const database = process.env.MONGOLAB_URI;

mongoose.connect(database, { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

module.exports = mongoose.connection;
