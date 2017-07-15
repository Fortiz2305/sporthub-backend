'use strict';

module.exports = {
  port: 3000,
  database: {
    host: process.env.DATABASE_HOST || 'localhost',
    port: process.env.DATABASE_PORT || 27017,
    name: process.env.DATABASE_NAME || 'SportHub',
  },
  jwtSecret: 'veryverysecretphrase'
};
