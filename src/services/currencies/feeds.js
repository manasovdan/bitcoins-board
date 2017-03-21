const feeds = [
  {
    name: 'btc-e.com',
    url: 'https://btc-e.com/api/3/ticker/btc_eur-btc_usd',
    currencies: [
      {
        symbol: 'BTC/EUR',
        buy: 'btc_eur.buy',
        sell: 'btc_eur.sell'
      },
      {
        symbol: 'BTC/USD',
        buy: 'btc_usd.buy',
        sell: 'btc_usd.sell'
      }

    ]
  },
  {
    name: 'blockchain.info',
    url: 'https://blockchain.info/ticker',
    currencies: [
      {
        symbol: 'BTC/EUR',
        buy: 'EUR.buy',
        sell: 'EUR.sell'
      },
      {
        symbol: 'BTC/USD',
        buy: 'USD.buy',
        sell: 'USD.sell'
      }
    ]
  },
  {
    name: 'oanda.com',
    url: 'https://www.oanda.com/rates/api/v1/rates/EUR.json?api_key=YdgMFWjOnfBEPs9ZjaKD2a3j&quote=USD',
    currencies: [
      {
        symbol: 'EUR/USD',
        buy: 'quotes.USD.ask',
        sell: 'quotes.USD.bid'
      }
    ]
  },
  {
    name: 'xignite.com',
    url: 'http://globalcurrencies.xignite.com/xGlobalCurrencies.json/GetRealTimeRate?Symbol=EURUSD&_token=163AC8BF535B404B9EF83A9F085A5671',
    errorField: 'Message',
    currencies: [
      {
        symbol: 'EUR/USD',
        buy: 'Ask',
        sell: 'Bid'
      }
    ]
  }
];

module.exports = feeds;
