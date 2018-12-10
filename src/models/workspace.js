const mongoose = require('mongoose');
const schema = require('../schemas/v1/workspace');

module.exports = mongoose.model('Workspace', schema);