/**
 * Region Service
 */
import prisma from "../../config/prisma";

export const getProvinces = async () => {
  return await prisma.province.findMany({
    orderBy: { name: "asc" },
  });
};

export const getCities = async (provinceId: number) => {
  return await prisma.city.findMany({
    where: { provinceId },
    orderBy: { name: "asc" },
  });
};

export const getDistricts = async (cityId: number) => {
  return await prisma.district.findMany({
    where: { cityId },
    orderBy: { name: "asc" },
  });
};
