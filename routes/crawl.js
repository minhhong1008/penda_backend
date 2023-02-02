import express from 'express';
import { crawl } from '../controllers/crawl';
const router = express.Router();

router.post('/crawl',  crawl)

module.exports = router;