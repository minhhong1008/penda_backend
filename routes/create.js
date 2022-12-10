import express from 'express';
import { create } from '../controllers/create';

const router = express.Router();
router.post('/create', create)
module.exports = router;