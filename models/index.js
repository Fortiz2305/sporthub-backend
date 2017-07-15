'use strict';
const mongoose = require('mongoose');
const config = require('../config/config');

if (config.database.user && config.database.password) {
  mongoose.connect(`mongodb://${config.database.user}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`);
} else {
  mongoose.connect(`mongodb://${config.database.host}:${config.database.port}/${config.database.name}`);
}

const sport = mongoose.model('Sport', require('./sport'));
const activity = mongoose.model('Activity', require('./activity'));
const user = mongoose.model('User', require('./user'));

const models = {
  Sport: sport,
  Activity: activity,
  User: user
};

module.exports = models;
