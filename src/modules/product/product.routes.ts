/**
 * Product Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as productController from "./product.controller";
import { uploadPhoto } from "../../utils/multer";
import { validate } from "../../middlewares/validate";
import { 
  createProductSchema, 
  updateProductSchema, 
  getProductSchema, 
  getProductByIdSchema 
} from "../../validations/product.validation";

const router = express.Router();

router.get("/", validate(getProductSchema), productController.getProducts);
router.get("/:id", validate(getProductByIdSchema), productController.getProductById);

router.post(
  "/",
  authenticate,
  uploadPhoto.array("images", 5),
  validate(createProductSchema),
  productController.createProduct,
);

router.put(
  "/:id",
  authenticate,
  uploadPhoto.array("images", 5),
  validate(updateProductSchema),
  productController.updateProduct,
);

router.delete("/:id", authenticate, productController.deleteProduct);

export default router;
