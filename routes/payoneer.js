import express from "express";
import {
  create,
  payoneerByID,
  getCountPayoneer_class,
  getpayoneer,
  listpayoneer,
  update,
  searchPayoneer,
} from "../controllers/payoneer";
import { canViewPayoneer } from "../controllers/payoneer";

const router = express.Router();
// Lấy payoneer_id từ url
router.param("payoneerId", payoneerByID);
// Chưa dùng
router.post("/payoneer/create", create);
// Update payoneer_info
router.put("/payoneer/update", update);
// View payoneer_table, và phân quyền view
router.get("/payoneer/list", canViewPayoneer, listpayoneer);
// View payoneer_info, và phân quyền view
router.get("/payoneer/get/:payoneerId",canViewPayoneer, getpayoneer);
// View count trong payoneer_class
router.get("/getpayoneer/count", getCountPayoneer_class);
// Hàm search
router.get("/payoneer/search",canViewPayoneer, searchPayoneer);

module.exports = router;