/**
 * Region Controller
 */
import { Request, Response } from "express";
import * as regionService from "./region.service";
import { errorResponse, successResponse } from "../../utils/response";

export const getProvinces = async (req: Request, res: Response) => {
  try {
    const provinces = await regionService.getProvinces();
    return successResponse(res, 200, "Provinsi berhasil diambil", provinces);
  } catch (error: any) {
    return errorResponse(res, 500, error.message);
  }
};

export const getCities = async (req: Request, res: Response) => {
  try {
    const provinceId = parseInt(req.query.provinceId as string);
    if (!provinceId) throw new Error("provinceId diperlukan");
    const cities = await regionService.getCities(provinceId);
    return successResponse(res, 200, "Kota berhasil diambil", cities);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};

export const getDistricts = async (req: Request, res: Response) => {
  try {
    const cityId = parseInt(req.query.cityId as string);
    if (!cityId) throw new Error("cityId diperlukan");
    const districts = await regionService.getDistricts(cityId);
    return successResponse(res, 200, "Kecamatan berhasil diambil", districts);
  } catch (error: any) {
    return errorResponse(res, 400, error.message);
  }
};
