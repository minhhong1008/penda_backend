import express from "express";
import {
  Gologincare,
} from "../controllers/autoapi";


const router = express.Router();

router.get("/Auto/Gologincare", Gologincare);

module.exports = router;