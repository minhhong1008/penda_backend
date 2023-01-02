import express from "express";
import {
  create,
  usersByID,
  getusers,
  listusers,
  listusers_timesheets,
  update,
  canViewUsers,
} from "../controllers/users";
const router = express.Router();

router.param("usersId", usersByID);
router.post("/users/create", create);
router.put("/users/update", update);
router.get("/users/list", canViewUsers, listusers);
router.get("/users/get/:usersId", canViewUsers, getusers);
router.get("/users/list_timesheets", listusers_timesheets);
module.exports = router;
