/**
 * Report Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as reportController from "./report.controller";

const router = express.Router();

router.get("/sales", authenticate, reportController.getSalesReport);

export default router;
