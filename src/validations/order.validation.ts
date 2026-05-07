/**
 * Order Validation Schema
 */
import { z } from "zod";

export const checkoutSchema = z.object({
  body: z.object({
    addressId: z.coerce.number().int().positive("Alamat harus dipilih"),
    shippingCost: z.coerce.number().nonnegative("Ongkos kirim tidak valid").optional(),
  }),
});
