/**
 * Payment Controller
 */
import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as paymentService from "./payment.service";
import { errorResponse, successResponse } from "../../utils/response";

export const checkout = async (req: AuthRequest, res: Response) => {
  try {
    const { orderId } = req.body;
    const result = await paymentService.requestSnapToken(orderId);
    return successResponse(res, 200, "Snap token berhasil didapatkan", result);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const webhook = async (req: Request, res: Response) => {
  try {
    const result = await paymentService.handleWebhook(req.body);
    return res.status(200).json(result);
  } catch (error: any) {
    return res.status(400).json({ message: error.message });
  }
};
