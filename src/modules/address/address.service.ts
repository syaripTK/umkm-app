/**
 * Address Service
 */
import prisma from "../../config/prisma";

export const getAddresses = async (userId: number) => {
  return await prisma.address.findMany({
    where: { userId },
    include: {
      province: true,
      city: true,
      district: true,
    },
  });
};

export const createAddress = async (userId: number, data: any) => {
  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }
  return await prisma.address.create({
    data: {
      ...data,
      userId,
    },
  });
};

export const updateAddress = async (id: number, userId: number, data: any) => {
  const address = await prisma.address.findFirst({
    where: { id, userId },
  });
  if (!address) throw new Error("Alamat tidak ditemukan");

  if (data.isDefault) {
    await prisma.address.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
  }

  return await prisma.address.update({
    where: { id },
    data,
  });
};

export const deleteAddress = async (id: number, userId: number) => {
  const address = await prisma.address.findFirst({
    where: { id, userId },
  });
  if (!address) throw new Error("Alamat tidak ditemukan");

  return await prisma.address.delete({
    where: { id },
  });
};
