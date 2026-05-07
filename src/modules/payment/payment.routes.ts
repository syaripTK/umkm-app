/**
 * Payment Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as paymentController from "./payment.controller";
import { validate } from "../../middlewares/validate";
import { paymentCheckoutSchema } from "../../validations/payment.validation";

const router = express.Router();

router.post("/checkout", authenticate, validate(paymentCheckoutSchema), paymentController.checkout);
router.post("/webhook", paymentController.webhook);

export default router;
