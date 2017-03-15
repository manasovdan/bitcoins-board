import Promise from 'bluebird'
import request from 'request-promise'
import feeds from './feeds'
import logger from '../logger'

const REQUEST_TIMEOUT = 3000;

function ignore(error, currencies) {
  logger.error(error);
  return currencies;
}

function ref(obj, str) {
  return str.split(".").reduce((o, x) => o[x], obj);
}

function parse(requestResult, feed) {
  const json = JSON.parse(requestResult);
  return feed.currencies.reduce((result, currency) => {
    result[currency.symbol] = {
      sell: ref(json, currency.sell),
      buy: ref(json, currency.buy)
    };
    return result;
  }, {});
}

export default function() {

  return new Promise.resolve(feeds)
    .reduce((currencies, feed) => request(feed.url, { timeout: REQUEST_TIMEOUT })
      .then((requestResult) => {
        if (feed.name === 'xignite.com') console.log(requestResult);
        currencies[feed.name] = { updated_at: new Date(), currencies: parse(requestResult, feed) };
        return currencies;
      })
      .catch(error => ignore(error, currencies)), {})

}
