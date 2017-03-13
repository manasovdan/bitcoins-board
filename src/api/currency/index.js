import { Router } from 'express'
import { show , bestCurrency, updateCurrency} from './controller'

const router = new Router();

router.get('/', show);
router.get('/best', bestCurrency);
router.get('/update', updateCurrency);

export default router
