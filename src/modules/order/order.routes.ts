/**
 * Order Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as orderController from "./order.controller";

const router = express.Router();

router.get("/", authenticate, orderController.getOrders);
router.post("/checkout", authenticate, orderController.checkout);

export default router;
