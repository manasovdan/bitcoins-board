const http = require('http');
const SocketIO = require('socket.io');
const express = require('./services/express');
const logger = require('./services/logger');
const { port, ip } = require('./config');
const currencyUpdatesNotifier = require('./services/currencies/currenciesUpdater');

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);

currencyUpdatesNotifier(io);

server.listen(port, ip, () => logger.log(`Express server listening on http://${ip}:${port}`));

module.exports = app;
