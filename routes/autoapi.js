import express from "express";
import {
  Gologincare,
  Gologinreg,
  GologinAllcare,
  PostGologinreg,
} from "../controllers/autoapi";


const router = express.Router();

router.get("/Auto/GologinAllcare", GologinAllcare);
router.get("/Auto/Gologincare", Gologincare);
router.get("/Auto/Gologinreg", Gologinreg);
router.post("/Autopost/Gologinreg", PostGologinreg);
router.post("/Autopost/Gologincare", Gologincare);

module.exports = router;