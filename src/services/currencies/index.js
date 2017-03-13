import _ from 'lodash'
import Promise from 'bluebird'
import request from 'request-promise'
import feeds from './feeds'

function ignore(error) {
  // I know that it's bad practice but have no time for configuring error logger
  console.log(error)
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
    .map((feedName) => request(feeds[feedName].url)
      .then((requestResult) => _.merge({ feedName, updated_at: new Date() }, parse(requestResult, feeds[feedName])))
      .catch(ignore))

}
