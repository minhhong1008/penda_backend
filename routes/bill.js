import express from "express";
import { create, updatetest, getBill, getBillTable, update,getEmployee } from "../controllers/bill"
const router = express.Router();

router.post("/bill_class/create", create);
router.get("/bill_class/pay_collect", getBill);
router.post("/bill_table/update", update);
router.get("/bill_table/list_table", getBillTable);
router.post("/billadsds/upate", updatetest);
router.get("/bill/getemployee", getEmployee);
module.exports = router;