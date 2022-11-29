import express from 'express';
import { requireSignin, isAdmin, isAuth  } from '../controllers/auth';
import { update, photo, create, productByID, list, read, remove } from '../controllers/product';
import { userbyId } from '../controllers/user';

const router = express.Router();

// Lấy param

router.param("productId", productByID);
router.param("userId", userbyId);

// Danh sách sản phẩm

router.get("/products", list);

// Chi tiết sản phẩm

router.get('/product/:productId', read);

// Thêm sản phẩm

router.post('/product', create)

// Xóa sản phẩm

router.delete('/product/:productId', remove);

// Sửa sản phẩm

router.put('/product/:productId', update)

// Ảnh sản phẩm

router.get("/product/photo/:productId", photo)


module.exports = router;