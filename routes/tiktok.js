import express from 'express';
import { create, tiktokByID, gettiktok, listtiktok, update } from '../controllers/tiktok';

const router = express.Router();

router.param("tiktokId", tiktokByID);
router.post('/tiktok/create', create);
router.put('/tiktok/update', update)
router.get('/tiktok/list', listtiktok)
router.get('/tiktok/get/:tiktokId', gettiktok)

module.exports = router;