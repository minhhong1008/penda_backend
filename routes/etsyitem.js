import express from 'express';
import { create, etsyitemByID, getetsyitem, listetsyitem, update } from '../controllers/etsyitem';
import { canViewEtsyitem } from "../controllers/etsyitem";
const router = express.Router();

router.param("etsyitemId", etsyitemByID);
router.post('/etsyitem/create', create);
router.put('/etsyitem/update', update)
router.get('/etsyitem/list',canViewEtsyitem, listetsyitem)
router.get('/etsyitem/get/:etsyitemId',canViewEtsyitem, getetsyitem)

module.exports = router;