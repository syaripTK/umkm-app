/**
 * Payment Validation Schema
 */
import { z } from "zod";

export const paymentCheckoutSchema = z.object({
  body: z.object({
    orderId: z.coerce.number().int().positive("Order ID harus valid"),
  }),
});
