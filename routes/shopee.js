import express from "express";
import {
  create,
  shopeeByID,
  getCountShopee_class,
  getshopee,
  listshopee,
  update,
} from "../controllers/shopee";
import { canViewShopee } from "../controllers/shopee";

const router = express.Router();
// Lấy shopee_id từ url
router.param("shopeeId", shopeeByID);
// Chưa dùng
router.post("/shopee/create", create);
// Update shopee_info
router.put("/shopee/update", update);
// View shopee_table, và phân quyền view
router.get("/shopee/list", canViewShopee, listshopee);
// View shopee_info, và phân quyền view
router.get("/shopee/get/:shopeeId",canViewShopee, getshopee);
// View count trong shopee_class
router.get("/getshopee/count", getCountShopee_class);

module.exports = router;