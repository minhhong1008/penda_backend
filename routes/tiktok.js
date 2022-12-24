import express from "express";
import {
  create,
  tiktokByID,
  getCountTiktok_class,
  gettiktok,
  listtiktok,
  update,
} from "../controllers/tiktok";
import { canViewTiktok } from "../controllers/tiktok";

const router = express.Router();
// Lấy tiktok_id từ url
router.param("tiktokId", tiktokByID);
// Chưa dùng
router.post("/tiktok/create", create);
// Update tiktok_info
router.put("/tiktok/update", update);
// View tiktok_table, và phân quyền view
router.get("/tiktok/list", canViewTiktok, listtiktok);
// View tiktok_info, và phân quyền view
router.get("/tiktok/get/:tiktokId",canViewTiktok, gettiktok);
// View count trong tiktok_class
router.get("/gettiktok/count", getCountTiktok_class);

module.exports = router;