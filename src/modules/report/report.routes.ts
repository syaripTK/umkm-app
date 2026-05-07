/**
 * Report Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as reportController from "./report.controller";
import { validate } from "../../middlewares/validate";
import { getSalesReportSchema } from "../../validations/report.validation";

const router = express.Router();

router.get("/sales", authenticate, validate(getSalesReportSchema), reportController.getSalesReport);

export default router;
