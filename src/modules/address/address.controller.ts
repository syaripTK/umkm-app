/**
 * Address Controller
 */
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as addressService from "./address.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getAddresses = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const addresses = await addressService.getAddresses(userId);
    return successResponse(res, 200, "Alamat berhasil diambil", addresses);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const createAddress = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const address = await addressService.createAddress(userId, req.body);
    return successResponse(res, 201, "Alamat berhasil ditambahkan", address);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const updateAddress = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const userId = req.user!.id;
    const address = await addressService.updateAddress(id, userId, req.body);
    return successResponse(res, 200, "Alamat berhasil diperbarui", address);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const deleteAddress = async (req: AuthRequest, res: Response) => {
  try {
    const id = parseInt(req.params.id as string);
    const userId = req.user!.id;
    await addressService.deleteAddress(id, userId);
    return successResponse(res, 200, "Alamat berhasil dihapus", null);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
