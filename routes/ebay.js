import express from "express";
import {
  create,
  ebayByID,
  getCountEbay_class,
  getebay,
  listebay,
  searchEbay,
  update,
} from "../controllers/ebay";
import { canViewEbay } from "../controllers/ebay";

const router = express.Router();
// Lấy ebay_id từ url
router.param("ebayId", ebayByID);
// Chưa dùng
router.post("/ebay/create", create);
// Update ebay_info
router.put("/ebay/update", update);
// View ebay_table, và phân quyền view
router.get("/ebay/list", canViewEbay, listebay);
// View ebay_info, và phân quyền view
router.get("/ebay/get/:ebayId",canViewEbay, getebay);
// View count trong ebay_class
router.get("/getebay/count", getCountEbay_class);
// Hàm search
router.get("/ebay/search",canViewEbay, searchEbay);

module.exports = router;
