import { Request, Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as userService from "./user.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;
    const profile = await userService.getProfile(userId);
    return successResponse(res, 200, "Profile berhasil diambil", profile);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const editProfile = async (req: AuthRequest, res: Response) => {
  try {
    const userId = parseInt(req.params.id as string);

    if (req.user!.id !== userId) {
      return errorResponse(res, 403, "Anda tidak memiliki akses untuk mengubah profil ini");
    }

    const { name, phone } = req.body;
    
    const updatePayload: any = { name, phone };
    if (req.file) {
      updatePayload.avatar = req.file.filename;
    }

    const result = await userService.updateUserService(userId, updatePayload);
    
    return successResponse(res, 200, "Profile berhasil diperbarui", result);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

