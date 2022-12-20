import express from 'express';
import { create, infoByID, getinfo, listinfo, update } from '../controllers/info';
import { canViewInfo } from "../controllers/info";
const router = express.Router();

router.param("infoId", infoByID);
router.post('/info/create', create);
router.put('/info/update', update)
router.get('/info/list',canViewInfo, listinfo)
router.get('/info/get/:infoId',canViewInfo, getinfo)

module.exports = router;