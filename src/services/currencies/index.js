import _ from 'lodash'
import parseFeeds from './parser'

export let currencies = {};

export function getBestCurrency() {
  return Object.keys(currencies).reduce((result, source) => {
    if (currencies[source].buy < result.buy.price) {
      result.buy = {
        source,
        price: currencies[source].buy
      }
    }
    if (currencies[source].sell > result.sell.price) {
      result.sell = {
        source,
        price: currencies[source].sell
      }
    }
    return result;
  }, {
    sell: { price: 0 },
    buy: { price: Infinity }
  })
}

export function updateCurrencies() {
  return parseFeeds().then((newCurrencies) => {
    currencies = _.merge(currencies, newCurrencies);
    return currencies;
  })
}

export default currencies;
