import express from 'express';
import { create, facebookByID, getfacebook, listfacebook, update } from '../controllers/facebook';

const router = express.Router();

router.param("facebookId", facebookByID);
router.post('/facebook/create', create);
router.put('/facebook/update', update)
router.get('/facebook/list', listfacebook)
router.get('/facebook/get/:facebookId', getfacebook)

module.exports = router;