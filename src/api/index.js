import { Router } from 'express'
import currency from './currency'

const router = new Router();

router.use('/currencies', currency);

export default router
