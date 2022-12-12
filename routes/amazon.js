import express from 'express';
import { create, amazonByID, getamazon, listamazon, update } from '../controllers/amazon';

const router = express.Router();

router.param("amazonId", amazonByID);
router.post('/amazon/create', create);
router.put('/amazon/update', update)
router.get('/amazon/list', listamazon)
router.get('/amazon/get/:amazonId', getamazon)

module.exports = router;