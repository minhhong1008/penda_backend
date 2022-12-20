import { upload, read } from "../controllers/upload"
import express from 'express';

const router = express.Router();

router.post('/files', upload)
router.get('files', read)

module.exports = router;