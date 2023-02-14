import express from "express";
import { update } from "../controllers/work";
import { canViewMail } from "../controllers/mail";

const router = express.Router();

router.put("/mail/updatmailWork", update);
module.exports = router;
