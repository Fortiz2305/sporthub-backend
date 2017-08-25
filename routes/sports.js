'use strict';
const express = require('express');
const Sport = require('../models').Sport;

const router = express.Router();

router.get('/sports/check', (req, res) => {
  res.status(200).json('ok');
});

router.get('/sports', (req, res) => {
  const sportsNames = [];
  Sport.find({}, (err, sports) => {
    sports.forEach((sport) => {
      sportsNames.push(sport.name);
    });
    return res.status(200).json(sportsNames);
  });
});

router.get('/sports/name/:name', (req, res) => {
  Sport.findOne({ name: req.params.name }, (error, sport) => {
    if (error) return res.status(400).send(error);
    return res.status(200).json(sport);
  });
});

router.post('/sports', (req, res, next) => {
  const data = req.body;
  if (!data.name || !data.numPlayers) {
    return res.status(400).json({ success: false, message: 'name and numPlayers fields are mandatory' });
  }

  new Sport({ name: data.name, numPlayers: data.numPlayers }).save((err) => {
    if (err) { return res.status(400).json({ message: err }); }
    return res.status(201).json({
      success: true,
      message: 'You have successfully added a new sport'
    });
  });
  return next();
});

router.delete('/sports/name/:name', (req, res) => {
  Sport.remove({ name: req.params.name }, (err) => {
    if (err) { return res.status(400).send(err); }
    return res.status(204).json({
      success: true,
      message: `Sport ${req.params.name} successfully removed`
    });
  });
});

module.exports = router;
