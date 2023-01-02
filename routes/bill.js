import express from "express";
import { create, updatetest, getBill, getBillTable, update } from "../controllers/bill"
const router = express.Router();

router.post("/bill/create", create);
router.post("/billadsds/upate", updatetest);
router.get("/bill/pay_collect", getBill);
router.get("/bill/list_table", getBillTable);
router.post("/bill/update", update);

module.exports = router;