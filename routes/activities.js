'use strict';
const express = require('express');
const models = require('../models');

const router = express.Router();

router.get('/activities/check', (req, res) => {
  res.json('ok');
});

router.get('/activities', (req, res, next) => {
  models.Activity.find({}).populate('users sport').exec((error, activities) => {
    if (error) { return res.status(400).json({ success: false, message: error }); }
    const result = [];
    activities.forEach((activity) => {
      const activityInfo = {};
      activityInfo.name = activity.name;
      activityInfo.sport = activity.sport.name;
      activityInfo.numPlayers = activity.sport.numPlayers;
      activityInfo.place = activity.place;
      activityInfo.date = activity.date;
      activityInfo.hour = activity.hour;
      activityInfo.users = [];
      activity.users.forEach((user) => {
        activityInfo.users.push(user.name);
      });
      result.push(activityInfo);
    });
    res.status(200).json(result);
    return next();
  });
});

router.post('/activities/:name/join', (req, res) => {
  if (!req.body.user) {
    return res.status(400).json({
      success: false,
      message: 'User field is mandatory'
    });
  }
  models.Activity.findOne({ name: req.params.name }).populate('users sport').exec((err, activity) => {
    if (err) { return res.status(400).json({ success: false, message: err }); }
    try {
      /* eslint-disable consistent-return */
      models.User.findOne({ email: req.body.user }, (error, user) => {
        if (error) { return res.status(400).json({ success: false, message: err }); }
        const activityUser = user._id; // eslint-disable-line no-underscore-dangle
        activity.users.push(activityUser);
        activity.save();
      });
    } catch (error) {
      return res.status(400).json({ success: false, message: error });
    }
    return res.status(200).json({
      success: true,
      message: `You have successfully join to ${req.params.name} activity`
    });
  });
});

// TODO: improve this method
/* eslint-disable consistent-return */
router.post('/activities', (req, res) => {
  if (!req.body.name || !req.body.sport || !req.body.users || !req.body.place || !req.body.place) {
    return res.status(400).json({
      success: false,
      message: 'Name, sport, place, date and users fields are mandatory'
    });
  }
  const users = [req.body.users];
  models.User.findOne({ email: users[0] }, (err, user) => {
    if (err) { return res.status(400).json({ success: false, message: err }); }
    const activityUser = user._id; // eslint-disable-line no-underscore-dangle

    models.Sport.findOne({ name: req.body.sport }, (error, sport) => {
      if (error) { return res.status(400).json({ success: false, message: error }); }
      const activitySport = sport._id; // eslint-disable-line no-underscore-dangle

      new models.Activity({
        name: req.body.name,
        place: req.body.place,
        sport: activitySport,
        users: [activityUser],
        date: req.body.date,
        hour: req.body.hour
      }).save((saveErr) => {
        if (saveErr) { return res.status(400).json({ success: false, message: saveErr }); }
        return res.status(201).json({
          success: true,
          message: 'You have successfully added a new activity'
        });
      });
    });
  });
});
/* eslint-enable consistent-return */

router.delete('/activities/name/:name', (req, res) => {
  models.Activity.remove({ name: req.params.name }, (err) => {
    if (err) { return res.status(400).json({ success: false, message: err }); }
    return res.status(204).json({
      success: true,
      message: `Activity ${req.params.name} successfully removed`
    });
  });
});

module.exports = router;
