import express from "express";
import {
  create,
  projectByID,
  getCountproject_class,
  getproject,
  listproject,
  update,
} from "../controllers/project";
import { canViewproject } from "../controllers/project";

const router = express.Router();
// Lấy project_id từ url
router.param("projectId", projectByID);
// Chưa dùng
router.post("/project/create", create);
// Update project_info
router.put("/project/update", update);
// View project_table, và phân quyền view
router.get("/project/list", canViewproject, listproject);
// View project_info, và phân quyền view
router.get("/project/get/:projectId",canViewproject, getproject);
// View count trong project_class
router.get("/getproject/count", getCountproject_class);

module.exports = router;

