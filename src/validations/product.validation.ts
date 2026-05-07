/**
 * Product Validation Schema
 */
import { z } from "zod";

export const getProductSchema = z.object({
  query: z.object({
    search: z.string().optional(),
    categoryId: z.coerce.number().int().positive().optional(),
  }),
});

export const getProductByIdSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("ID produk harus valid"),
  }),
});

export const createProductSchema = z.object({
  body: z.object({
    name: z.string().min(3, "Nama produk minimal 3 karakter"),
    price: z.coerce.number().positive("Harga harus angka positif"),
    categoryId: z.coerce.number().int().positive("Category ID harus valid"),
    description: z.string().min(1, "Deskripsi harus diisi"),
    originCity: z.string().min(1, "Kota asal harus diisi"),
    stock: z.coerce.number().int().nonnegative("Stok tidak boleh negatif"),
  }),
});

export const updateProductSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("ID produk harus valid"),
  }),
  body: z.object({
    name: z.string().min(3, "Nama produk minimal 3 karakter").optional(),
    price: z.coerce.number().positive("Harga harus angka positif").optional(),
    categoryId: z.coerce.number().int().positive("Category ID harus valid").optional(),
    description: z.string().optional(),
    originCity: z.string().optional(),
    stock: z.coerce.number().int().nonnegative("Stok tidak boleh negatif").optional(),
  }),
});
