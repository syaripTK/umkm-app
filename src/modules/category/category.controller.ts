/**
 * Category Controller
 */
import { Request, Response } from "express";
import * as categoryService from "./category.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getCategories();
    return successResponse(res, 200, "Kategori berhasil diambil", categories);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};
