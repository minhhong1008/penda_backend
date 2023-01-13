import express from "express";
import {
  create,
  etsyByID,
  getCountEtsy_class,
  getetsy,
  listetsy,
  searchEtsy,
  update,
} from "../controllers/etsy";
import { canViewEtsy } from "../controllers/etsy";

const router = express.Router();
// Lấy etsy_id từ url
router.param("etsyId", etsyByID);
// Chưa dùng
router.post("/etsy/create", create);
// Update etsy_info
router.put("/etsy/update", update);
// View etsy_table, và phân quyền view
router.get("/etsy/list", canViewEtsy, listetsy);
// View etsy_info, và phân quyền view
router.get("/etsy/get/:etsyId",canViewEtsy, getetsy);
// View count trong etsy_class
router.get("/getetsy/count", getCountEtsy_class);
// Search etsy
router.get("/etsy/search",canViewEtsy, searchEtsy);
module.exports = router;

