/**
 * Category Routes
 */
import express from "express";
import * as categoryController from "./category.controller";

const router = express.Router();

router.get("/", categoryController.getCategories);

export default router;
