/**
 * Cart Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as cartController from "./cart.controller";
import { validate } from "../../middlewares/validate";
import { addToCartSchema, removeFromCartSchema } from "../../validations/cart.validation";

const router = express.Router();

router.get("/", authenticate, cartController.getCart);
router.post("/", authenticate, validate(addToCartSchema), cartController.addToCart);
router.delete("/:productId", authenticate, validate(removeFromCartSchema), cartController.removeFromCart);

export default router;
