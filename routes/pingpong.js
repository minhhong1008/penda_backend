import express from "express";
import {
  create,
  pingpongByID,
  getCountPingpong_class,
  getpingpong,
  listpingpong,
  update,
} from "../controllers/pingpong";
import { canViewPingpong } from "../controllers/pingpong";

const router = express.Router();
// Lấy pingpong_id từ url
router.param("pingpongId", pingpongByID);
// Chưa dùng
router.post("/pingpong/create", create);
// Update pingpong_info
router.put("/pingpong/update", update);
// View pingpong_table, và phân quyền view
router.get("/pingpong/list", canViewPingpong, listpingpong);
// View pingpong_info, và phân quyền view
router.get("/pingpong/get/:pingpongId",canViewPingpong, getpingpong);
// View count trong pingpong_class
router.get("/getpingpong/count", getCountPingpong_class);

module.exports = router;