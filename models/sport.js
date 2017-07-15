'use strict';

const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  numPlayers: { type: Number, required: true }
});

module.exports = sportSchema;
module.exports.sportSchema = sportSchema;
