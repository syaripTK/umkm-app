/**
 * Cart Controller
 */
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as cartService from "./cart.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const cart = await cartService.getCart(userId);
    return successResponse(res, 200, "Isi keranjang berhasil diambil", cart);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { productId, quantity } = req.body;
    const cartItem = await cartService.addToCart(userId, productId, quantity || 1);
    return successResponse(res, 201, "Produk berhasil ditambahkan ke keranjang", cartItem);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const productId = parseInt(req.params.productId as string);
    await cartService.removeFromCart(userId, productId);
    return successResponse(res, 200, "Produk berhasil dihapus dari keranjang", null);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
