/**
 * Product Service
 */
import prisma from "../../config/prisma";

export const getProducts = async (search?: string, categoryId?: number) => {
  return await prisma.product.findMany({
    where: {
      status: "active",
      AND: [
        search ? { name: { contains: search, mode: "insensitive" } } : {},
        categoryId ? { categoryId } : {},
      ],
    },
    include: {
      category: true,
      images: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const getProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      images: true,
      seller: {
        select: { id: true, name: true, avatar: true },
      },
      reviews: {
        include: {
          user: { select: { name: true, avatar: true } },
        },
      },
    },
  });
};

export const createProduct = async (sellerId: number, data: any) => {
  const { images, ...productData } = data;
  return await prisma.product.create({
    data: {
      ...productData,
      sellerId,
      images: {
        create: images,
      },
    },
    include: { images: true },
  });
};

export const updateProduct = async (id: number, data: any) => {
  const { images, ...productData } = data;
  
  if (images) {
    await prisma.productImage.deleteMany({ where: { productId: id } });
    await prisma.productImage.createMany({
      data: images.map((img: any) => ({ ...img, productId: id })),
    });
  }

  return await prisma.product.update({
    where: { id },
    data: productData,
    include: { images: true },
  });
};

export const deleteProduct = async (id: number) => {
  return await prisma.product.delete({
    where: { id },
  });
};
