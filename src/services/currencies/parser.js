import _ from 'lodash'
import Promise from 'bluebird'
import request from 'request-promise'
import feeds from './feeds'
import logger from '../logger'

function ignore(error, currencies) {
  logger.error(error);
  return currencies;
}

function ref(obj, str) {
  return str.split(".").reduce((o, x) => o[x], obj);
}

function parse(requestResult, feed) {
  const json = JSON.parse(requestResult);
  return { sell: ref(json, feed.sell), buy: ref(json, feed.buy) }
}

export default function() {
  return new Promise.resolve(Object.keys(feeds))
    .reduce((currencies, feedName) => request(feeds[feedName].url, { timeout: 2000 })
      .then((requestResult) => {
        currencies[feedName] = _.merge({ updated_at: new Date() }, parse(requestResult, feeds[feedName]));
        return currencies;
      })
      .catch(error => ignore(error, currencies)), {})

}
