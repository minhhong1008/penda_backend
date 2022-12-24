import express from "express";
import {
  create,
  mailByID,
  getCountMail_class,
  getmail,
  listmail,
  update,
} from "../controllers/mail";
import { canViewMail } from "../controllers/mail";

const router = express.Router();
// Lấy mail_id từ url
router.param("mailId", mailByID);
// Chưa dùng
router.post("/mail/create", create);
// Update mail_info
router.put("/mail/update", update);
// View mail_table, và phân quyền view
router.get("/mail/list", canViewMail, listmail);
// View mail_info, và phân quyền view
router.get("/mail/get/:mailId",canViewMail, getmail);
// View count trong mail_class
router.get("/getmail/count", getCountMail_class);

module.exports = router;

