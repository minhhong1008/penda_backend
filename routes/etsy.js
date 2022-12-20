import express from "express";
import {
  create,
  etsyByID,
  getetsy,
  listetsy,
  update,
  getCountEtsy_class,
} from "../controllers/etsy";
import { canViewEtsy } from "../controllers/etsy";
const router = express.Router();

router.param("etsyId", etsyByID);
router.post("/etsy/create", create);
router.put("/etsy/update", update);
router.get("/etsy/list", canViewEtsy, listetsy);
router.get("/etsy/get/:etsyId", canViewEtsy, getetsy);
router.get("/getetsy/count", getCountEtsy_class);
module.exports = router;
