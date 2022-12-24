import express from "express";
import {
  create,
  facebookByID,
  getCountFacebook_class,
  getfacebook,
  listfacebook,
  update,
} from "../controllers/facebook";
import { canViewFacebook } from "../controllers/facebook";

const router = express.Router();
// Lấy facebook_id từ url
router.param("facebookId", facebookByID);
// Chưa dùng
router.post("/facebook/create", create);
// Update facebook_info
router.put("/facebook/update", update);
// View facebook_table, và phân quyền view
router.get("/facebook/list", canViewFacebook, listfacebook);
// View facebook_info, và phân quyền view
router.get("/facebook/get/:facebookId",canViewFacebook, getfacebook);
// View count trong facebook_class
router.get("/getfacebook/count", getCountFacebook_class);

module.exports = router;