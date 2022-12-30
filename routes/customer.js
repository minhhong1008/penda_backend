import express from "express";
import {
  create,
  customerByID,
  getCountCustomer_class,
  getcustomer,
  listcustomer,
  update,
} from "../controllers/customer";
import { canViewCustomer } from "../controllers/customer";

const router = express.Router();
// Lấy customer_id từ url
router.param("customerId", customerByID);
// Chưa dùng
router.post("/customer/create", create);
// Update customer_info
router.put("/customer/update", update);
// View customer_table, và phân quyền view
router.get("/customer/list", canViewCustomer, listcustomer);
// View customer_info, và phân quyền view
router.get("/customer/get/:customerId",canViewCustomer, getcustomer);
// View count trong customer_class
router.get("/getcustomer/count", getCountCustomer_class);

module.exports = router;