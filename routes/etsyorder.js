import express from 'express';
import { create, etsyorderByID, getetsyorder, listetsyorder, update } from '../controllers/etsyorder';

import { canViewEtsyorder } from "../controllers/etsyorder";
const router = express.Router();

router.param("etsyorderId", etsyorderByID);
router.post('/etsyorder/create', create);
router.put('/etsyorder/update', update)
router.get('/etsyorder/list',canViewEtsyorder, listetsyorder)
router.get('/etsyorder/get/:etsyorderId',canViewEtsyorder, getetsyorder)

module.exports = router;