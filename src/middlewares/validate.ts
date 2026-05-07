/**
 * Validation Middleware
 */
import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodIssue } from "zod";

export const validate = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await schema.safeParseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      if (!result.success) {
        const errors = result.error.issues.map((err: ZodIssue) => ({
          field: err.path.length > 1 ? err.path.slice(1).join(".") : err.path[0],
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors,
        });
      }

      const validatedData = result.data as any;
      
      if (validatedData.body) {
        req.body = validatedData.body;
      }
      
      if (validatedData.query) {
        for (const key in validatedData.query) {
          (req.query as any)[key] = validatedData.query[key];
        }
      }
      
      if (validatedData.params) {
        for (const key in validatedData.params) {
          (req.params as any)[key] = validatedData.params[key];
        }
      }

      return next();
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
};
