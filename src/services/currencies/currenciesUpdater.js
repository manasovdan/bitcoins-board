const getBestCurrency = require('./');

const currencyUpdateWorker = (io) => {
  function getCurrenciesAndSendToUsers() {
    return getBestCurrency().then(bestCurrencies => io.emit('updateCurrency', bestCurrencies));
  }

  const interval = setInterval(getCurrenciesAndSendToUsers, 15000);
  process.on('exit', () => clearInterval(interval));
};

module.exports = io => currencyUpdateWorker(io);
