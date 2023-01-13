import express from "express";
import {
  create,
  simByID,
  getCountSim_class,
  getsim,
  listsim,
  update,
  searchSim,
} from "../controllers/sim";
import { canViewSim } from "../controllers/sim";

const router = express.Router();
// Lấy sim_id từ url
router.param("simId", simByID);
// Chưa dùng
router.post("/sim/create", create);
// Update sim_info
router.put("/sim/update", update);
// View sim_table, và phân quyền view
router.get("/sim/list", canViewSim, listsim);
// View sim_info, và phân quyền view
router.get("/sim/get/:simId",canViewSim, getsim);
// View count trong sim_class
router.get("/getsim/count", getCountSim_class);
// Hàm search
router.get("/sim/search",canViewSim, searchSim);

module.exports = router;

