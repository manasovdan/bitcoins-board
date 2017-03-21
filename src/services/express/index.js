const express = require('express');
const cors = require('cors');
const compression = require('compression');
const morgan = require('morgan');

module.exports = () => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.static('public'));

  return app;
};
