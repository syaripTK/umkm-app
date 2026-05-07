/**
 * Auth Routes
 */
import { Router } from "express";
import * as authController from "./auth.controller";
import { validate } from "../../middlewares/validate";
import { registerSchema, loginSchema, verifyEmailSchema } from "../../validations/auth.validation";

const router = Router();

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/verify/:token", validate(verifyEmailSchema), authController.verifyEmail);

export default router;
