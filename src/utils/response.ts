import { Response } from "express";

const successResponse = <T>(
  res: Response,
  code: number,
  message: string,
  data: T,
) => {
  return res.status(code).json({ success: true, message, data });
};

const errorResponse = (res: Response, code: number, message: string) => {
  return res.status(code).json({ success: false, message });
};

export { successResponse, errorResponse };
