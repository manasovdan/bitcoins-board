import React from 'react';
import io from 'socket.io-client';

const socket = io('/', {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 100
});

const data = {
  'BTC/EUR': {
    status: { active: 2, total: 2 },
    sell: { sourceName: 'blockchain.info', price: 1172.42 },
    buy: { sourceName: 'btc-e.com', price: 1147.26027 }
  },
  'BTC/USD': {
    status: { active: 2, total: 2 },
    sell: { sourceName: 'blockchain.info', price: 1251.35 },
    buy: { sourceName: 'btc-e.com', price: 1237.498 }
  },
  'EUR/USD': {
    status: { active: 2, total: 2 },
    sell: { sourceName: 'oanda.com', price: '1.06778' },
    buy: { sourceName: 'xignite.com', price: '1.06234' }
  }
};

function Currency(props) {
  const data = props.currencyData;
  return (
    <div className="currencyInfo">
      <h4>{props.currencySymbol} <span className="status">{data.status.active} / {data.status.total}</span></h4>
      <div className="cell">
        <span className="price">{data.sell.price}</span>
        <span>Best sell price</span>
        <span className="sourceName">from: {data.sell.sourceName}</span>
      </div>
      <div className="cell">
        <span className="price">{data.buy.price}</span>
        <span>Best buy price</span>
        <span className="sourceName">from: {data.buy.sourceName}</span>
      </div>
    </div>
  )
}

class Board extends React.Component {
  constructor() {
    super();
    this.state = { currencies: data, connectionStatus: 'offline' };
    socket.on('connect', () => this.setState({ connectionStatus: 'online' }));
    socket.on('disconnect', () => this.setState({ connectionStatus: 'offline' }));
    socket.on('updateCurrency', (data) => this._handleCurrencyChange(data));
  }

  _handleCurrencyChange(data) {
    console.log('new data');
    this.setState({ currencies: data })
  }

  render() {
    const isOnline = this.state.connectionStatus;
    const currencies = Object.keys(this.state.currencies).map((currencyName) => {
      const currencyData = this.state.currencies[currencyName];
      return <Currency key={currencyName} currencySymbol={currencyName} currencyData={currencyData}/>
    });

    return (
      <div id="board">
        <div id="currencies">{currencies}</div>

        <div id="connectionStatus">{isOnline}</div>
      </div>
    )
  }
}

export default Board;
