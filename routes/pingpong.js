import express from 'express';
import { create, pingpongByID, getpingpong, listpingpong, update } from '../controllers/pingpong';
import { canViewPingpong } from "../controllers/pingpong";
const router = express.Router();

router.param("pingpongId", pingpongByID);
router.post('/pingpong/create', create);
router.put('/pingpong/update', update)
router.get('/pingpong/list',canViewPingpong, listpingpong)
router.get('/pingpong/get/:pingpongId',canViewPingpong, getpingpong)

module.exports = router;