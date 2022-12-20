import express from 'express';
import { create, payoneerByID, getpayoneer, listpayoneer, update } from '../controllers/payoneer';
import { canViewPayoneer } from "../controllers/payoneer";
const router = express.Router();

router.param("payoneerId", payoneerByID);
router.post('/payoneer/create', create);
router.put('/payoneer/update', update)
router.get('/payoneer/list',canViewPayoneer, listpayoneer)
router.get('/payoneer/get/:payoneerId',canViewPayoneer, getpayoneer)

module.exports = router;