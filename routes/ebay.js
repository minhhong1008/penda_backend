import express from 'express';
import { create, getEbay, ebayByID, listEbay, update} from '../controllers/ebay';

const router = express.Router();

// Thêm account mới

router.param("ebayID", ebayByID);

router.post('/ebay/create', create)

router.put('/ebay/update', update)

router.get('/ebay/get/:ebayID', getEbay)

router.get('/ebay/list', listEbay)

// Tạo hàm create ở trong controllers

module.exports = router;