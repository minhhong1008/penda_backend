import express from "express";
import { create, createVerify, list } from "../controllers/timeSheet";


const router = express.Router();

router.post("/timeSheet/create", create);
router.get("/timeSheet/list", list);
router.post("/timeSheet/postcheck", createVerify);

module.exports = router;