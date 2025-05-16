import { Router } from 'express';
import * as coinCtrl from './controller/CoinPackageCon';
import * as userCtrl from './controller/UserCon';

const router = Router();

// CoinPackage CRUD
router.get('/coins',    coinCtrl.getAll);
router.get('/coins/:id',coinCtrl.getOne);
router.post('/coins',   coinCtrl.create);
router.put('/coins/:id',coinCtrl.update);
router.delete('/coins/:id',coinCtrl.remove);

// User balance & purchase
router.get('/user/balance',   userCtrl.getBalance);
router.post('/user/purchase', userCtrl.purchase);

export default router;