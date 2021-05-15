const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");

const basePath = path.join(__dirname, "../models")


class DataFactory {
    constructor(url) {
        this.models = {};

        console.log('Connecting to MongoDB...');
        mongoose.set('useUnifiedTopology', true);
        mongoose.set('useNewUrlParser', true);
        mongoose.set('useCreateIndex', true);
        mongoose.connect(url);

        const connection = mongoose.connection;

        connection.on('error', (e) => console.log(e));
        connection.once('open', () => console.log('Connected to MongoDB.'));

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
        console.log(`Created model: ${name}`);
    }
}

module.exports = DataFactory;