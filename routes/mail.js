import express from 'express';
import { create, mailByID, getmail, listmail, update } from '../controllers/mail';

const router = express.Router();

router.param("mailId", mailByID);
router.post('/mail/create', create);
router.put('/mail/update', update)
router.get('/mail/list', listmail)
router.get('/mail/get/:mailId', getmail)

module.exports = router;