import express from 'express';
import { create, usersByID, getusers, listusers,listusers_timesheets, update } from '../controllers/users';
import { canViewUser } from "../controllers/user";
const router = express.Router();

router.param("usersId", usersByID);
router.post('/users/create', create);
router.put('/users/update', update)
router.get('/users/list',canViewUser, listusers)
router.get('/users/get/:usersId',canViewUser, getusers)

router.get('/users/list_timesheets', listusers_timesheets)
module.exports = router;