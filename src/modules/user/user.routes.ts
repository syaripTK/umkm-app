/**
 * User Routes
 */
import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import * as userController from "./user.controller";
import { uploadPhoto } from "../../utils/multer";
import { validate } from "../../middlewares/validate";
import { editProfileSchema } from "../../validations/user.validation";

const router = express.Router();

router.get("/myprofile", authenticate, userController.getProfile);
router.put(
  "/update-profile/:id",
  authenticate,
  uploadPhoto.single("avatar"),
  validate(editProfileSchema),
  userController.editProfile,
);

export default router;
