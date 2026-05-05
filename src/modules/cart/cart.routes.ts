/**
 * Cart Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as cartController from "./cart.controller";

const router = express.Router();

router.get("/", authenticate, cartController.getCart);
router.post("/", authenticate, cartController.addToCart);
router.delete("/:productId", authenticate, cartController.removeFromCart);

export default router;
