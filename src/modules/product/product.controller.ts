/**
 * Product Controller
 */
import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as productService from "./product.service";
import { errorResponse, successResponse } from "../../utils/response";
import { createSlug } from "../../utils/slug";

export const getProducts = async (req: Request, res: Response) => {
  try {
    const { search, categoryId } = req.query;
    const products = await productService.getProducts(
      search as string,
      categoryId ? Number(categoryId) : undefined
    );
    return successResponse(res, 200, "Produk berhasil diambil", products);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await productService.getProductById(Number(id));
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

    const files = req.files as Express.Multer.File[];
    const images = files ? files.map((file, index) => ({
      imageUrl: `/uploads/photos/${file.filename}`,
      isPrimary: index === 0
    })) : [];

    const data = {
      ...req.body,
      slug: createSlug(req.body.name),
      images
    };

    const product = await productService.createProduct(req.user!.id, data);
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
    
    const { id } = req.params;
    const files = req.files as Express.Multer.File[];
    const images = files && files.length > 0 ? files.map((file, index) => ({
      imageUrl: `/uploads/photos/${file.filename}`,
      isPrimary: index === 0
    })) : undefined;

    const data = {
      ...req.body,
      ...(req.body.name && { slug: createSlug(req.body.name) }),
      ...(images && { images })
    };

    const product = await productService.updateProduct(Number(id), data);
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
    const { id } = req.params;
    await productService.deleteProduct(Number(id));
    return successResponse(res, 200, "Produk berhasil dihapus", null);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
