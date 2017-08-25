'use strict';

const assert = require('assert');
const expect = require('chai').expect;
const express = require('express');
const superagent = require('superagent');
const config = require('../config/config');
const models = require('../models');
const activities = require('../routes/activities.js');
const sports = require('../routes/sports.js');
const User = require('mongoose').model('User');

const rootUrl = `http://localhost:${config.port}/api/v1`;

const sportInputs = {
  name: 'Test',
  numPlayers: 10
};
const userInputs = {
  email: 'user1@example.com',
  password: 'testPassword',
  name: 'testUser'
};

describe('SportHub API', () => {
  let server;
  let testSport;
  let testUser;
  let testActivity;

  before(() => {
    const app = express();

    app.use('/api/v1', activities, sports);
    testSport = new models.Sport(sportInputs);
    testUser = new User(userInputs);
    testActivity = new models.Activity({
      name: 'testActivity',
      place: 'aPlace',
      sport: testSport._id,
      users: [testUser._id]
    });

    models.Sport.remove({}, (error) => {
      assert.ifError(error);
    });
    models.Activity.remove({}, (error) => {
      assert.ifError(error);
    });
    models.User.remove({}, (error) => {
      assert.ifError(error);
    });

    server = app.listen(config.port);
  });

  after(() => {
    server.close();
  });

  it('can load a Sport', (done) => {
    testSport.save((err) => {
      assert.ifError(err);
      const url = `${rootUrl}/sports/name/${testSport.name}`;
      superagent.get(url, (error, res) => {
        assert.ifError(error);
        let result;
        assert.doesNotThrow(() => {
          result = JSON.parse(res.text);
        });
        expect(result.name).to.equal(testSport.name);
        expect(result.numPlayers).to.equal(testSport.numPlayers);
        done();
      });
    });
  });

  it('Retrieves list of current activities', (done) => {
    testUser.save((err) => {
      assert.ifError(err);
    });
    testActivity.save((err) => {
      assert.ifError(err);
      const url = `${rootUrl}/activities`;
      superagent.get(url, (error, res) => {
        assert.ifError(error);
        let result;
        assert.doesNotThrow(() => {
          result = JSON.parse(res.text);
        });
        expect(result).to.be.a('Array');
        expect(result).to.have.length(1);
        expect(result[0].name).to.equal(testActivity.name);
        expect(result[0].place).to.equal(testActivity.place);
        expect(result[0].numPlayers).to.equal(testSport.numPlayers);
        expect(result[0].users).to.be.a('Array');
        expect(result[0].users).to.have.length(1);
        expect(result[0].users[0]).to.equal(testUser.name);
        done();
      });
    });
  });
});
