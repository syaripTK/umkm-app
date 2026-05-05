/**
 * Region Routes
 */
import express from "express";
import * as regionController from "./region.controller";

const router = express.Router();

router.get("/provinces", regionController.getProvinces);
router.get("/cities", regionController.getCities);
router.get("/districts", regionController.getDistricts);

export default router;
