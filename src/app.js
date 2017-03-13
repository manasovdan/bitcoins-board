import http from 'http'
import { port, ip } from './config'
import express from './services/express'
import api from './api'

const app = express(api);
const server = http.createServer(app);


setImmediate(() => {
  server.listen(port, ip, () => {
    console.log(`Express server listening on http://${ip}:${port}`)
  })
})
;
export default app
