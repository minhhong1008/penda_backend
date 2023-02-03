import express from "express";
import { content, create, list } from "../controllers/blog";
const router = express.Router();
router.post("/blog/create", create);
router.get("/blog/list", list);
router.get("/blog/content/:id", content);

module.exports = router;
