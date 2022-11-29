import express from 'express';
const router = express.Router();

import { userbyId, read, update, list, remove } from '../controllers/user';
import { requireSignin, isAdmin, isAuth } from "../controllers/auth";

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req, res) => {
    res.json({
        user: req.profile
    })
});

// Danh sách người dùng

router.get('/users/:userId' ,requireSignin, isAuth, isAdmin, list)

// Thông tin người dùng

router.get('/user/:userId', requireSignin, isAuth, read);

// Cập nhật thông tin người dùng

router.put('/user/:userId', requireSignin, isAuth, update);

// Xóa người dùng

router.delete('/user/:userId',  remove)

// Lấy ID người dùng

router.param('userId', userbyId);

module.exports = router;



