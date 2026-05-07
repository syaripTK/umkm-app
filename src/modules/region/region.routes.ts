/**
 * Region Routes
 */
import express from "express";
import * as regionController from "./region.controller";
import { validate } from "../../middlewares/validate";
import { getCitiesSchema, getDistrictsSchema } from "../../validations/region.validation";

const router = express.Router();

router.get("/provinces", regionController.getProvinces);
router.get("/cities", validate(getCitiesSchema), regionController.getCities);
router.get("/districts", validate(getDistrictsSchema), regionController.getDistricts);

export default router;
