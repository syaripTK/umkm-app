/**
 * Order Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as orderController from "./order.controller";
import { validate } from "../../middlewares/validate";
import { checkoutSchema } from "../../validations/order.validation";

const router = express.Router();

router.get("/", authenticate, orderController.getOrders);
router.post("/checkout", authenticate, validate(checkoutSchema), orderController.checkout);

export default router;
