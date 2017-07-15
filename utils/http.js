'use strict';

const http = require('http');
const config = require('../config/config');

module.exports = {
  /**
   * Make a HTTP GET request
   *
   * @param {string} path - api path to make the request
   * @param {function} callback - callback to pass the results JSON object(s) back
   */
  httpGet: function (path, callback) {
    const options = {
      host: '127.0.0.1',
      port: config.port,
      path: `/api/v1${path}`,
      headers: { 'Content-Type': 'application/json' }
    };

    http.get(options, (res) => {
      let output = '';

      res.on('data', (chunk) => {
        output += chunk;
      });

      res.on('end', () => {
        const result = JSON.parse(output);
        callback(result);
      });
    });
  }
};
