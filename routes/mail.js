import express from 'express';
import { create, mailByID, getmail, listmail, update } from '../controllers/mail';

import { canViewMail } from "../controllers/mail";
const router = express.Router();

router.param("mailId", mailByID);
router.post('/mail/create', create);
router.put('/mail/update', update)
router.get('/mail/list',canViewMail, listmail)
router.get('/mail/get/:mailId',canViewMail, getmail)

module.exports = router;