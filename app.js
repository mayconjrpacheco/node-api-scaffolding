'use strict';

const app = require('./src');
const http = require('http');
const server = http.createServer(app);

const onError = error => {
    console.log(error);
}

const onListening = () => {
    console.log('Listening...');
}

server.listen('8080');
server.on('error', onError);
server.on('listening', onListening);