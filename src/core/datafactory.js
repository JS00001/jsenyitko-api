const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const logger = require("../core/logger");
const basePath = path.join(__dirname, "../models")


class DataFactory {
    constructor(url) {
        this.models = {};

        logger.log('purple', 'database', 'Connecting to MongoDB...');
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(url);

        const connection = mongoose.connection;

        connection.on('error', (e) => logger.log('red', 'error', 'Could not connect to database'));
        connection.once('open', () => logger.log('purple', 'database', 'Connected to MongoDB'));

        fs.readdir(basePath, (err, fileName) => {
            fileName.forEach((name) => {
                const file = require(`${basePath}/${name}`);
                this.createModel(file);
            })
        })
    }

    async collection(name) {
        return mongoose.connection.model(name)
    }

    async createModel({ name, schema }) {
        const model = mongoose.model(name, schema);
        this.models[model.modelName] = model;
        logger.log('purple', 'database', `Created model ${name}`);
    }
}

module.exports = DataFactory;