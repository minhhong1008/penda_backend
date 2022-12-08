import express from 'express';
import { create, etsyByID, getetsy, listetsy, update } from '../controllers/etsy';

const router = express.Router();

router.param("etsyId", etsyByID);
router.post('/etsy/create', create);
router.put('/etsy/update', update)
router.get('/etsy/list', listetsy)
router.get('/etsy/get/:etsyId', getetsy)

module.exports = router;