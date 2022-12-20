import express from 'express';
import { create, paypalByID, getpaypal, listpaypal, update } from '../controllers/paypal';
import { canViewPaypal } from "../controllers/paypal";
const router = express.Router();

router.param("paypalId", paypalByID);
router.post('/paypal/create', create);
router.put('/paypal/update', update)
router.get('/paypal/list',canViewPaypal, listpaypal)
router.get('/paypal/get/:paypalId',canViewPaypal, getpaypal)

module.exports = router;