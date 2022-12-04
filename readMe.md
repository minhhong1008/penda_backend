Tạo route mới:
- Vào trong folder routes -> tạo file tên_route.js (account.js)

********************************************************

import express from 'express';

const router = express.Router();

// Thêm account mới

router.post('/account/create', create)

module.exports = router;



********************************************************

Tạo controller 
- Vào trong folder controllers -> tạo file tên_route.js (account.js)