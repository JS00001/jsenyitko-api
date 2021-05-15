const DataFactory = require('./datafactory');
const config = require("./config");

if (!config.mongoUrl) return console.log('Invalid MongoDB Url');
const db = new DataFactory(config.mongoUrl);

module.exports = db;