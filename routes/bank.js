import express from 'express';
import { create, bankByID, getbank, listbank, update } from '../controllers/bank';
import { canViewBank } from "../controllers/bank";
const router = express.Router();

router.param("bankId", bankByID);
router.post('/bank/create', create);
router.put('/bank/update', update)
router.get('/bank/list',canViewBank, listbank)
router.get('/bank/get/:bankId',canViewBank, getbank)

module.exports = router;