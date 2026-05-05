import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export const authorizeAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Akses ditolak, hanya admin" });
    return;
  }
  next();
};
