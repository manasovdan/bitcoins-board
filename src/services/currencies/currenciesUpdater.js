const getBestCurrency = require('./');

const sendSocket = (socket) => {
  getBestCurrency().then(bestCurrencies => socket.emit('updateCurrency', bestCurrencies));
};

module.exports = (io) => io.on('connection', sendSocket);
