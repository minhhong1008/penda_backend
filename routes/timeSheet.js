import express from "express";
import { create, list } from "../controllers/timeSheet";


const router = express.Router();

router.post("/timeSheet/create", create);
router.get("/timeSheet/list", list);

module.exports = router;