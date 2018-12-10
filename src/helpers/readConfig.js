'use strict';

const path = require('path');

const ENVS_DIR = '/envs/';
const DEFAULT_FILE_NAME_ENV = '_local.env';
const DEV_FILE_NAME_ENV = '_dev.env';


const getEnvDir = () => {
    let pwd = process.cwd();
    return pwd += ENVS_DIR;
}

module.exports.readEnv = () => {
    try {
        const envDir = getEnvDir();
        const nodeEnv = process.env.NODE_ENV;
        let fileName = DEFAULT_FILE_NAME_ENV;
        let file = '';

        switch (nodeEnv) {
            case 'development':
                fileName = DEV_FILE_NAME_ENV;
                break;
        }

        file = envDir + fileName;

        require('dotenv')
            .config({
                path: path.resolve(file)
            })
    } catch (e) {
        console.log('Cant read env file');
        console.log(e);
    }
}