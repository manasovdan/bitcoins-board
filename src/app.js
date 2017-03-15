import http from 'http'
import SocketIO from 'socket.io';
import express from './services/express'
import { port, ip } from './config'
import currencyUpdatesNotifier from './services/currencies/currenciesUpdater'

const app = express();
const server = http.createServer(app);
const io = new SocketIO(server);
currencyUpdatesNotifier(io);

setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(`Express server listening on http://${ip}:${port}`)
  })
});

export default app
