import _ from 'lodash'
import parseFeeds from './parser'

let lastParseTime = new Date();
export let currencies = {};

export let bestCurrencies = {};

export function updateBestCurrency() {
  function increaseTotalSources(result, currencyName) {
    result[currencyName].status.total += 1;
  }

  function increaseActiveSources(result, currencyName) {
    result[currencyName].status.active += 1;
  }

  function initBestCurrencyTemplateIfDoesntExist(result, currencyName) {
    const currencySymbolIsNew = !{}.hasOwnProperty.call(result, currencyName);
    if (currencySymbolIsNew) {
      result[currencyName] = {
        status: { active: 0, total: 0 },
        sell: { price: 0 },
        buy: { price: Infinity }
      }
    }
  }

  function checkAndUpdateBestBuyPrice(currency, result, currencyName, sourceName) {
    if (currency.buy < result[currencyName].buy.price) {
      result[currencyName].buy = {
        sourceName,
        price: currency.buy
      }
    }
  }

  function checkAndUpdateBestSellPrice(currency, result, currencyName, sourceName) {
    if (currency.sell > result[currencyName].sell.price) {
      result[currencyName].sell = {
        sourceName,
        price: currency.sell
      }
    }
  }

  bestCurrencies = Object.keys(currencies).reduce((result, sourceName) => {
    const source = currencies[sourceName];
    Object.keys(source.currencies).forEach((currencyName) => {
      initBestCurrencyTemplateIfDoesntExist(result, currencyName);
      const currency = source.currencies[currencyName];
      increaseTotalSources(result, currencyName); // TODO store total sources number somewhere instead of calculating
      if (new Date(source.updated_at) < lastParseTime) return;
      increaseActiveSources(result, currencyName);
      checkAndUpdateBestBuyPrice(currency, result, currencyName, sourceName);
      checkAndUpdateBestSellPrice(currency, result, currencyName, sourceName);
    });
    return result;
  }, {});
  return bestCurrencies;
}

export function updateCurrencies() {
  lastParseTime = new Date();
  return parseFeeds().then((newCurrencies) => {
    currencies = _.merge(currencies, newCurrencies);
    return currencies;
  })
}

export default currencies;
