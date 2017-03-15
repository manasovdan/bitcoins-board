import express from 'express'
import cors from 'cors'
import compression from 'compression'
import morgan from 'morgan'

export default () => {
  const app = express();

  app.use(cors());
  app.use(compression());
  app.use(morgan('dev'));

  
  app.use(express.static('public'));

  return app
}
