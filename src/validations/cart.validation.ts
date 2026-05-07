/**
 * Cart Validation Schema
 */
import { z } from "zod";

export const addToCartSchema = z.object({
  body: z.object({
    productId: z.coerce.number().int().positive("Product ID harus valid"),
    quantity: z.coerce.number().int().positive("Quantity harus minimal 1"),
  }),
});

export const removeFromCartSchema = z.object({
  params: z.object({
    productId: z.coerce.number().int().positive("Product ID harus valid"),
  }),
});
