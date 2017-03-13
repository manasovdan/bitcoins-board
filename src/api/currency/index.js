import { Router } from 'express'
import { show } from './controller'

const router = new Router();

router.get('/', show);

export default router
