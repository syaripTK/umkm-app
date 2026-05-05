/**
 * Cart Service
 */
import prisma from "../../config/prisma";

export const getCart = async (userId: number) => {
  return await prisma.cart.findMany({
    where: { userId },
    include: {
      product: {
        include: { images: true },
      },
    },
  });
};

export const addToCart = async (userId: number, productId: number, quantity: number) => {
  const existing = await prisma.cart.findUnique({
    where: {
      userId_productId: { userId, productId },
    },
  });

  if (existing) {
    return await prisma.cart.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return await prisma.cart.create({
    data: { userId, productId, quantity },
  });
};

export const removeFromCart = async (userId: number, productId: number) => {
  return await prisma.cart.delete({
    where: {
      userId_productId: { userId, productId },
    },
  });
};
