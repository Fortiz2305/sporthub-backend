'use strict';

const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

// Routes
const activitiesRoutes = require('./routes/activities');
const authRoutes = require('./routes/auth');
const sportRoutes = require('./routes/sports');
const dashboardRoutes = require('./routes/dashboard');
const usersRoutes = require('./routes/users');
const authCheckMiddleware = require('./middleware/auth-check');

// Config
const config = require('./config/config');
const localSignupStrategy = require('./config/passport/local-signup');
const localLoginStrategy = require('./config/passport/local-login');

const app = express();

// CORS middleware
const allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, authorization');

  // intercept OPTIONS method
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
};

app.use(express.static(path.join(__dirname, '/..', '/frontend/static')));
app.use(express.static(path.join(__dirname, '/..', '/frontend/dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(passport.initialize());
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// auth check middleware
app.use('/api/v1', authCheckMiddleware);
// auth routes
app.use('/auth/v1', authRoutes);

// routes
app.use('/api/v1', sportRoutes, activitiesRoutes, dashboardRoutes, usersRoutes);

app.listen(config.port);
