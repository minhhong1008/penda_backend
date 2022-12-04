import express from 'express';

const router = express.Router();

// Thêm account mới

router.post('/account/create', create)

module.exports = router;