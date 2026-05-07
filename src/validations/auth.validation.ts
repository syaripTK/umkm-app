/**
 * Auth Validation Schema
 */
import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Nama minimal 2 karakter"),
    email: z.string().email("Email tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Email tidak valid"),
    password: z.string().min(1, "Password harus diisi"),
  }),
});

export const verifyEmailSchema = z.object({
  params: z.object({
    token: z.string().min(1, "Token tidak valid"),
  }),
});
