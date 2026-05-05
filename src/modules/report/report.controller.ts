/**
 * Report Controller
 */
import { Response } from "express";
import { AuthRequest } from "../../middlewares/auth.middleware";
import * as reportService from "./report.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getSalesReport = async (req: AuthRequest, res: Response) => {
  try {
    if (req.user!.role !== "admin") {
      return errorResponse(res, 403, "Hanya admin yang dapat melihat laporan");
    }
    const from = req.query.from as string;
    const to = req.query.to as string;
    if (!from || !to) throw new Error("Parameter 'from' dan 'to' diperlukan");
    
    const report = await reportService.getSalesReport(from, to);
    return successResponse(res, 200, "Laporan penjualan berhasil diambil", report);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
