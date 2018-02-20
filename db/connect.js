const Mongoose = require('mongoose');
const { promisifyAll } = require('bluebird');
const { mongo_url } = require('../config');

const mongoOptions = {
    useMongoClient: true
}

Mongoose.connect(process.env.DB_CONN_URL || mongo_url, mongoOptions);

const db = Mongoose.connection;

db.on('error',console.log)

db.once('open', ()=>console.log("DB opened"))

module.exports = promisifyAll(Mongoose);
