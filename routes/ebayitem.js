import express from 'express';
import { create, ebayitemByID, getebayitem, listebayitem, update } from '../controllers/ebayitem';
import { canViewEbayitem } from "../controllers/ebayitem";
const router = express.Router();

router.param("ebayitemId", ebayitemByID);
router.post('/ebayitem/create', create);
router.put('/ebayitem/update', update)
router.get('/ebayitem/list',canViewEbayitem, listebayitem)
router.get('/ebayitem/get/:ebayitemId',canViewEbayitem, getebayitem)
module.exports = router;