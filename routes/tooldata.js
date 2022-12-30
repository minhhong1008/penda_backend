import express from 'express';
// import 2 hàm tạo data và xử lý ghép nối các field qua _id
import { Create_newdata, getEmployee} from '../controllers/tooldata';
const router = express.Router();
router.post('/tooldata_create', Create_newdata)
router.get("/tooldata_get", getEmployee);
module.exports = router;