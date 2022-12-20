import express from 'express';
import { create, ebayorderByID, getebayorder, listebayorder, update } from '../controllers/ebayorder';
import { canViewEbayorder } from "../controllers/ebayorder";
const router = express.Router();

router.param("ebayorderId", ebayorderByID);
router.post('/ebayorder/create', create);
router.put('/ebayorder/update', update)
router.get('/ebayorder/list',canViewEbayorder, listebayorder)
router.get('/ebayorder/get/:ebayorderId',canViewEbayorder, getebayorder)

module.exports = router;