'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const activitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  sport: { type: Schema.Types.ObjectId, ref: 'Sport' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  place: { type: String, required: true },
  date: { type: Date },
  hour: { type: Date }
});

module.exports = activitySchema;
module.exports.activitySchema = activitySchema;
