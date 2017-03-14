import _ from 'lodash'
import parseFeeds from './parser'

export let currencies = {};

export function getBestCurrency() {
  return Object.keys(currencies).reduce((result, sourceName) => {
    const source = currencies[sourceName];
    Object.keys(source.currencies).forEach((currencyName) => {
      const currency = source.currencies[currencyName];
      const currencySymbolIsNew = !{}.hasOwnProperty.call(result, currencyName);
      if (currencySymbolIsNew) {
        result[currencyName] = {
          sell: { price: 0 },
          buy: { price: Infinity }
        }
      }
      if (currency.buy < result[currencyName].buy.price) {
        result[currencyName].buy = {
          sourceName,
          price: currency.buy
        }
      }
      if (currency.sell > result[currencyName].sell.price) {
        result[currencyName].sell = {
          sourceName,
          price: currency.sell
        }
      }
    });
    return result;
  }, {})
}

export function updateCurrencies() {
  return parseFeeds().then((newCurrencies) => {
    currencies = _.merge(currencies, newCurrencies);
    return currencies;
  })
}

export default currencies;
