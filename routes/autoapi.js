import express from "express";
import {
  Gologincare,
  Gologinreg,
} from "../controllers/autoapi";


const router = express.Router();

router.get("/Auto/Gologincare", Gologincare);
router.get("/Auto/Gologinreg", Gologinreg);

module.exports = router;