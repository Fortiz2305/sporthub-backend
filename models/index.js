'use strict';
const mongoose = require('mongoose');
const config = require('../config/config');

const mongoHost = process.env.MONGO_HOST || config.database.host;

mongoose.connect(`mongodb://${mongoHost}:${config.database.port}/${config.database.name}`);

const sport = mongoose.model('Sport', require('./sport'));
const activity = mongoose.model('Activity', require('./activity'));
const user = mongoose.model('User', require('./user'));

const models = {
  Sport: sport,
  Activity: activity,
  User: user
};

module.exports = models;
