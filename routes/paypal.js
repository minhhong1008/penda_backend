import express from 'express';
import { create, paypalByID, getpaypal, listpaypal, update } from '../controllers/paypal';

const router = express.Router();

router.param("paypalId", paypalByID);
router.post('/paypal/create', create);
router.put('/paypal/update', update)
router.get('/paypal/list', listpaypal)
router.get('/paypal/get/:paypalId', getpaypal)

module.exports = router;