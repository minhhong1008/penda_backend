import express from 'express';
import { create, proxyByID, getproxy, listproxy, update } from '../controllers/proxy';
import { canViewProxy } from "../controllers/proxy";
const router = express.Router();

router.param("proxyId", proxyByID);
router.post('/proxy/create', create);
router.put('/proxy/update', update)
router.get('/proxy/list',canViewProxy, listproxy)
router.get('/proxy/get/:proxyId',canViewProxy, getproxy)

module.exports = router;