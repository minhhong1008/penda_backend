import express from "express";
import {
  create,
  infoByID,
  getCountInfo_class,
  getinfo,
  listinfo,
  update,
  searchInfo,
} from "../controllers/info";
import { canViewInfo } from "../controllers/info";

const router = express.Router();
// Lấy info_id từ url
router.param("infoId", infoByID);
// Chưa dùng
router.post("/info/create", create);
// Update info_info
router.put("/info/update", update);
// View info_table, và phân quyền view
router.get("/info/list", canViewInfo, listinfo);
// View info_info, và phân quyền view
router.get("/info/get/:infoId",canViewInfo, getinfo);
// View count trong info_class
router.get("/getinfo/count", getCountInfo_class);
// Hàm search
router.get("/info/search",canViewInfo, searchInfo);
module.exports = router;