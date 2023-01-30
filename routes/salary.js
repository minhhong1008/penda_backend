import express from "express";
import { list } from "../controllers/salary";


const router = express.Router();


router.get("/salary/list", list);


module.exports = router;
