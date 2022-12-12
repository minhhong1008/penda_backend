import express from 'express';
import { create, deviceByID, getdevice, listdevice, update } from '../controllers/device';

const router = express.Router();

router.param("deviceId", deviceByID);
router.post('/device/create', create);
router.put('/device/update', update)
router.get('/device/list', listdevice)
router.get('/device/get/:deviceId', getdevice)

module.exports = router;