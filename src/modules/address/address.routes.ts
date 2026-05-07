/**
 * Address Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as addressController from "./address.controller";
import { validate } from "../../middlewares/validate";
import { createAddressSchema, updateAddressSchema } from "../../validations/address.validation";

const router = express.Router();

router.get("/", authenticate, addressController.getAddresses);
router.post("/", authenticate, validate(createAddressSchema), addressController.createAddress);
router.put("/:id", authenticate, validate(updateAddressSchema), addressController.updateAddress);
router.delete("/:id", authenticate, addressController.deleteAddress);

export default router;
