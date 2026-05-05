/**
 * Address Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as addressController from "./address.controller";

const router = express.Router();

router.get("/", authenticate, addressController.getAddresses);
router.post("/", authenticate, addressController.createAddress);
router.put("/:id", authenticate, addressController.updateAddress);
router.delete("/:id", authenticate, addressController.deleteAddress);

export default router;
