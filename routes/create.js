import express from 'express';
import { create, submit } from '../controllers/create';

const router = express.Router();
router.post('/create', create)
router.post('/submit', submit)

module.exports = router;