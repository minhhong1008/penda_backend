import express from 'express';
import { create, simByID, getsim, listsim, update } from '../controllers/sim';
import { canViewSim } from "../controllers/sim";
const router = express.Router();

router.param("simId", simByID);
router.post('/sim/create', create);
router.put('/sim/update', update)
router.get('/sim/list',canViewSim, listsim)
router.get('/sim/get/:simId',canViewSim, getsim)

module.exports = router;