import express from 'express';
import { create, simByID, getsim, listsim, update } from '../controllers/sim';

const router = express.Router();

router.param("simId", simByID);
router.post('/sim/create', create);
router.put('/sim/update', update)
router.get('/sim/list', listsim)
router.get('/sim/get/:simId', getsim)

module.exports = router;