/**
 * Address Validation Schema
 */
import { z } from "zod";

export const createAddressSchema = z.object({
  body: z.object({
    provinceId: z.coerce.number().int().positive("Provinsi harus dipilih"),
    cityId: z.coerce.number().int().positive("Kota harus dipilih"),
    districtId: z.coerce.number().int().positive("Kecamatan harus dipilih"),
    label: z.string().min(1, "Label alamat harus diisi"),
    recipient: z.string().min(1, "Nama penerima harus diisi"),
    phone: z.string().min(10, "Nomor telepon minimal 10 karakter"),
    detail: z.string().min(1, "Detail alamat harus diisi"),
    isDefault: z.boolean().optional().default(false),
  }),
});

export const updateAddressSchema = z.object({
  params: z.object({
    id: z.coerce.number().int().positive("ID alamat harus valid"),
  }),
  body: z.object({
    provinceId: z.coerce.number().int().positive().optional(),
    cityId: z.coerce.number().int().positive().optional(),
    districtId: z.coerce.number().int().positive().optional(),
    label: z.string().min(1).optional(),
    recipient: z.string().min(1).optional(),
    phone: z.string().min(10).optional(),
    detail: z.string().min(1).optional(),
    isDefault: z.boolean().optional(),
  }),
});
