/**
 * Product Controller
 */
import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as productService from "./product.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
    const products = await productService.getProducts(search, categoryId);
    return successResponse(res, 200, "Produk berhasil diambil", products);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const product = await productService.getProductById(id);
    if (!product) return errorResponse(res, 404, "Produk tidak ditemukan");
    return successResponse(res, 200, "Detail produk berhasil diambil", product);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "admin") {
      return errorResponse(res, 403, "Hanya admin yang dapat membuat produk");
    }
    const product = await productService.createProduct(req.user!.id, req.body);
    return successResponse(res, 201, "Produk berhasil dibuat", product);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "admin") {
      return errorResponse(res, 403, "Hanya admin yang dapat mengubah produk");
    }
    const id = parseInt(req.params.id as string);
    const product = await productService.updateProduct(id, req.body);
    return successResponse(res, 200, "Produk berhasil diperbarui", product);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "admin") {
      return errorResponse(res, 403, "Hanya admin yang dapat menghapus produk");
    }
    const id = parseInt(req.params.id as string);
    await productService.deleteProduct(id);
    return successResponse(res, 200, "Produk berhasil dihapus", null);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
