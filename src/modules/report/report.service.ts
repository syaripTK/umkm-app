/**
 * Report Service
 */
import prisma from "../../config/prisma";

export const getSalesReport = async (from: string, to: string) => {
  const startDate = new Date(from);
  const endDate = new Date(to);
  endDate.setHours(23, 59, 59, 999);

  const sales = await prisma.order.findMany({
    where: {
      orderedAt: {
        gte: startDate,
        lte: endDate,
      },
      payment: {
        status: "success",
      },
    },
    include: {
      items: true,
      user: { select: { name: true, email: true } },
    },
    orderBy: { orderedAt: "desc" },
  });

  const totalRevenue = sales.reduce((acc, order) => acc + Number(order.total), 0);
  const totalOrders = sales.length;

  return {
    summary: {
      totalRevenue,
      totalOrders,
      from: startDate,
      to: endDate,
    },
    sales,
  };
};
