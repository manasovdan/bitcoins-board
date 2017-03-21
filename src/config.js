const path = require('path');

const config = {
  root: path.join(__dirname, '..'),
  port: process.env.PORT || 9000,
  ip: process.env.IP || '0.0.0.0'
};

module.exports = config;
