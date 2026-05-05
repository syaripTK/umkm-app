/**
 * Product Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as productController from "./product.controller";

const router = express.Router();

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.post("/", authenticate, productController.createProduct);
router.put("/:id", authenticate, productController.updateProduct);
router.delete("/:id", authenticate, productController.deleteProduct);

export default router;
