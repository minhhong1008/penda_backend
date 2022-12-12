import express from 'express';
import { create, shopeeByID, getshopee, listshopee, update } from '../controllers/shopee';

const router = express.Router();

router.param("shopeeId", shopeeByID);
router.post('/shopee/create', create);
router.put('/shopee/update', update)
router.get('/shopee/list', listshopee)
router.get('/shopee/get/:shopeeId', getshopee)

module.exports = router;