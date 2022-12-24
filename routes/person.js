import express from "express";
import {
  create,
  personByID,
  getCountPerson_class,
  getperson,
  listperson,
  update,
} from "../controllers/person";
import { canViewPerson } from "../controllers/person";

const router = express.Router();
// Lấy person_id từ url
router.param("personId", personByID);
// Chưa dùng
router.post("/person/create", create);
// Update person_info
router.put("/person/update", update);
// View person_table, và phân quyền view
router.get("/person/list", canViewPerson, listperson);
// View person_info, và phân quyền view
router.get("/person/get/:personId",canViewPerson, getperson);
// View count trong person_class
router.get("/getperson/count", getCountPerson_class);

module.exports = router;

