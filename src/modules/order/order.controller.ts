/**
 * Order Controller
 */
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as orderService from "./order.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getOrders = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const orders = await orderService.getOrders(userId);
    return successResponse(res, 200, "Riwayat pesanan berhasil diambil", orders);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const { addressId, shippingCost } = req.body;
    const order = await orderService.checkout(userId, addressId, shippingCost || 0);
    return successResponse(res, 201, "Pesanan berhasil dibuat", order);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
