import express from 'express';
import { create, bankByID, getbank, listbank, update } from '../controllers/bank';

const router = express.Router();

router.param("bankId", bankByID);
router.post('/bank/create', create);
router.put('/bank/update', update)
router.get('/bank/list', listbank)
router.get('/bank/get/:bankId', getbank)

module.exports = router;