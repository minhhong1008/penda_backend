import express from 'express';
// import 2 hàm tạo data và xử lý ghép nối các field qua _id
import { Create_newdata } from '../controllers/tooldata';

const router = express.Router();
router.post('/tooldata_create', Create_newdata)

module.exports = router;