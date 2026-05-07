/**
 * Region Validation Schema
 */
import { z } from "zod";

export const getCitiesSchema = z.object({
  query: z.object({
    provinceId: z.coerce.number().int().positive("provinceId harus valid"),
  }),
});

export const getDistrictsSchema = z.object({
  query: z.object({
    cityId: z.coerce.number().int().positive("cityId harus valid"),
  }),
});
