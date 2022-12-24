import express from "express";
import {
  create,
  proxyByID,
  getCountProxy_class,
  getproxy,
  listproxy,
  update,
} from "../controllers/proxy";
import { canViewProxy } from "../controllers/proxy";

const router = express.Router();
// Lấy proxy_id từ url
router.param("proxyId", proxyByID);
// Chưa dùng
router.post("/proxy/create", create);
// Update proxy_info
router.put("/proxy/update", update);
// View proxy_table, và phân quyền view
router.get("/proxy/list", canViewProxy, listproxy);
// View proxy_info, và phân quyền view
router.get("/proxy/get/:proxyId",canViewProxy, getproxy);
// View count trong proxy_class
router.get("/getproxy/count", getCountProxy_class);

module.exports = router;

