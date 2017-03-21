const _ = require('lodash');
const parseFeeds = require('./parser');

function calculateBestCurrencies(currencies) {
  function checkAndUpdateBestBuyPrice(currency, feedResult) {
    if (!currency.buy || currency.buy.price > feedResult.buy) {
      currency.buy = {
        sourceName: feedResult.sourceName,
        price: feedResult.buy
      };
    }
  }

  function checkAndUpdateBestSellPrice(currency, feedResult) {
    if (!currency.sell || currency.sell.price < feedResult.sell) {
      currency.sell = {
        sourceName: feedResult.sourceName,
        price: feedResult.sell
      };
    }
  }

  Object.keys(currencies).forEach((currencySymbol) => {
    const currency = currencies[currencySymbol];
    currency.active = currency.feedResults.length;
    currency.feedResults.forEach((feedResult) => {
      checkAndUpdateBestBuyPrice(currency, feedResult);
      checkAndUpdateBestSellPrice(currency, feedResult);
    });
  });
  return currencies;
}

module.exports = () => parseFeeds().then(calculateBestCurrencies);
