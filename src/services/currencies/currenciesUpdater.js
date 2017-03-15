import { updateCurrencies, updateBestCurrency } from './';

let bestCurrencies = {};

setInterval(() => updateCurrencies().then(() => {
  bestCurrencies = updateBestCurrency();
}), 15000);

const sendSocket = (socket) => {
  const sendCurrency = () => {
    socket.emit('updateCurrency', bestCurrencies);
  };

  const interval = setInterval(sendCurrency, 15000);
  const disconnect = () => (clearInterval(interval));

  socket.on('disconnect', disconnect);
};

export default io => io.on('connection', sendSocket);
