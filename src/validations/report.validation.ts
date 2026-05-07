/**
 * Report Validation Schema
 */
import { z } from "zod";

export const getSalesReportSchema = z.object({
  query: z.object({
    from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal 'from' harus YYYY-MM-DD"),
    to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal 'to' harus YYYY-MM-DD"),
  }),
});
