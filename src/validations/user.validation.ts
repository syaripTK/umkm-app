/**
 * User Validation Schema
 */
import { z } from "zod";

export const editProfileSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("ID user harus valid"),
  }),
  body: z.object({
    name: z.string().min(2, "Nama minimal 2 karakter").optional(),
    phone: z.string().min(10, "Nomor telepon minimal 10 karakter").optional(),
  }),
});
