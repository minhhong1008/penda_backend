import express from "express";
import {
  create,
  deviceByID,
  getCountDevice_class,
  getdevice,
  listdevice,
  searchDevice,
  update,
} from "../controllers/device";
import { canViewDevice } from "../controllers/device";

const router = express.Router();
// Lấy device_id từ url
router.param("deviceId", deviceByID);
// Chưa dùng
router.post("/device/create", create);
// Update device_info
router.put("/device/update", update);
// View device_table, và phân quyền view
router.get("/device/list", canViewDevice, listdevice);
// View device_info, và phân quyền view
router.get("/device/get/:deviceId",canViewDevice, getdevice);
// View count trong device_class
router.get("/getdevice/count", getCountDevice_class);
// Hàm search
router.get("/device/search",canViewDevice, searchDevice);
module.exports = router;

