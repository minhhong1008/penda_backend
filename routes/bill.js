import express from "express";
import { create, updatetest, getBill, getBillTable, update,getEmployee,canViewBill } from "../controllers/bill"
const router = express.Router();

router.post("/bill_class/create", create);
// View Bill_class, và phân quyền view
router.get("/bill_class/pay_collect",canViewBill, getBill);
router.post("/bill_table/update", update);
// View Bill_table, và phân quyền view
router.get("/bill_table/list_table",canViewBill, getBillTable);
router.post("/billadsds/upate", updatetest);
router.get("/bill/getemployee", getEmployee);
module.exports = router;