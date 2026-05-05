/**
 * Payment Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as paymentController from "./payment.controller";

const router = express.Router();

router.post("/checkout", authenticate, paymentController.checkout);
router.post("/webhook", paymentController.webhook);

export default router;
