'use strict';

const mongoose = require('mongoose');
const readRecursive = require('../utils/readRecursive');

const getMongoURI = (host, port, dbname) => (`mongodb://${host}:${port}/${dbname}`)

const getMongoOptions = () => ({
    poolSize: 100
});

const connectMongo = () => {
    return new Promise((resolve, reject) => {
        const host = process.env.DB_MONGO_HOST;
        const port = process.env.DB_MONGO_NAME;
        const dbname = process.env.DB_MONGO_NAME;
        if (typeof process.env.MONGODB === 'string' && process.env.MONGODB !== '') {
            mongoose.connect(
                getMongoURI(host, port, dbname),
                getMongoOptions(),
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        console.log('Connect MongoDB success');
                        resolve();
                    }
                }
            )
        } else {
            throw Error(`Can't find connection string to mongodb`);
        }

    })
}

module.exports.init = async (modelDir) => {
    try {
        await connectMongo();

        const models = readRecursive
            .directory(modelDir)
            .filter(item => item !== '');

        models.forEach(file => {
            let fileModif = file.replace('.js', '');
            require('../' + fileModif);
            console.log(`Model ${fileModif} --> ok!`);
        })
    } catch(e) {
        console.log(`Error: ${e}`);
    }
}