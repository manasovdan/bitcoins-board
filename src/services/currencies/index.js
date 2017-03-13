import _ from 'lodash'
import parseFeeds from './parser'

let currencies = {};

export default function() {
  return parseFeeds().then((newCurrencies) => {
    currencies = _.merge(currencies, newCurrencies);
    return currencies;
  })
}
