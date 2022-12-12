import express from 'express';
import { create, ebayByID, getebay, listebay, update } from '../controllers/ebay';

const router = express.Router();

router.param("ebayId", ebayByID);
router.post('/ebay/create', create);
router.put('/ebay/update', update)
router.get('/ebay/list', listebay)
router.get('/ebay/get/:ebayId', getebay)

module.exports = router;