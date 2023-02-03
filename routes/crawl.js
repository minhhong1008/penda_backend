import express from 'express';
import { create,crawl } from '../controllers/crawl';
const router = express.Router();


router.post("/crawl/create", create);
router.post('/crawl',  crawl)

module.exports = router;