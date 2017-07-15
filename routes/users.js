'use strict';

const express = require('express');
const User = require('../models').User;
const jwt = require('jsonwebtoken');
const config = require('../config/config');

const router = express.Router();

router.get('/users/check', (req, res) => {
  res.status(200).json('ok');
});

/* eslint-disable consistent-return */
router.get('/users/me', (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: 'You are not logged' });
  }

  const token = req.headers.authorization.split(' ')[1];

  jwt.verify(token, config.jwtSecret, (err, decodedUser) => {
    if (err) { return res.status(401).json(err); }
    const userId = decodedUser.sub;
    User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res.status(401).json(userErr);
      }
      return res.status(200).json({
        name: user.name,
        email: user.email
      });
    });
  });
});

router.get('/users', (req, res) => {
  const usersInfo = {};
  User.find({}, (err, users) => {
    if (err) { return res.status(400).json({ err }); }
    users.forEach((user) => {
      usersInfo[user.name] = user.email;
    });
    return res.status(200).json(usersInfo);
  });
});

router.get('/users/emails', (req, res) => {
  const emails = [];
  User.find({}, (err, users) => {
    if (err) { return res.status(400).json({ err }); }
    users.forEach((user) => {
      emails.push(user.email);
    });
    return res.status(200).json(emails);
  });
});

router.get('/users/email/:email', (req, res) => {
  User.findOne({ email: req.params.email }, (err, user) => {
    if (err) { return res.status(400).json(err); }
    return res.status(200).json(user);
  });
});

router.get('/users/name/:name', (req, res) => {
  User.findOne({ name: req.params.name }, (err, user) => {
    if (err) { return res.status(400).json(err); }
    return res.status(200).json(user);
  });
});

router.delete('/users/email/:email', (req, res) => {
  User.remove({ email: req.params.email }, (err) => {
    if (err) { return res.status(400).send(err); }
    return res.status(204).json({
      success: true,
      message: `User ${req.params.email} successfully removed`
    });
  });
});

module.exports = router;
