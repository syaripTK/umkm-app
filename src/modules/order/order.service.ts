/**
 * Order Service
 */
import prisma from "../../config/prisma";

export const getOrders = async (userId: number) => {
  return await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: { product: { include: { images: true } } },
      },
      address: true,
      payment: true,
    },
    orderBy: { orderedAt: "desc" },
  });
};

export const checkout = async (userId: number, addressId: number, shippingCost: number) => {
  const cartItems = await prisma.cart.findMany({
    where: { userId },
    include: { product: true },
  });

  if (cartItems.length === 0) throw new Error("Keranjang kosong");

  const subtotal = cartItems.reduce((acc, item) => {
    return acc + Number(item.product.price) * item.quantity;
  }, 0);

  const total = subtotal + shippingCost;
  const orderCode = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.order.create({
      data: {
        userId,
        addressId,
        orderCode,
        subtotal,
        shippingCost,
        total,
        items: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            productName: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    await tx.cart.deleteMany({ where: { userId } });

    return newOrder;
  });

  return order;
};
