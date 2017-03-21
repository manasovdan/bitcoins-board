const Promise = require('bluebird');
const request = require('request-promise');
const _ = require('lodash');
const feeds = require('./feeds');
const logger = require('../logger');

const REQUEST_TIMEOUT = 3000;
const currenciesTemplate = feeds.reduce((result, feed) => {
  feed.currencies.forEach((currency) => {
    if (!result[currency.symbol]) result[currency.symbol] = { active: 0, total: 1, feedResults: [] };
    else result[currency.symbol].total += 1;
  });
  return result;
}, {});

function ignore(error, currencies) {
  logger.error(error);
  return currencies;
}

function ref(obj, str) {
  return str.split('.').reduce((o, x) => o[x], obj);
}

function parse(requestResult, feed, currencies) {
  const json = JSON.parse(requestResult);
  if (feed.errorField && json[feed.errorField]) {
    throw new Error(`Feed request failed with error: "${json[feed.errorField]}"`);
  }
  feed.currencies.forEach(currency => currencies[currency.symbol].feedResults.push({
    sell: ref(json, currency.sell),
    buy: ref(json, currency.buy),
    sourceName: feed.name
  }));
  return currencies;
}

module.exports = () => Promise.resolve(feeds)
  .reduce((currencies, feed) => request(feed.url, { timeout: REQUEST_TIMEOUT })
      .then(requestResult => parse(requestResult, feed, currencies))
      .catch(error => ignore(error, currencies)),
    _.cloneDeep(currenciesTemplate));
