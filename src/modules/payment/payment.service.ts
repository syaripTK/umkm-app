/**
 * Payment Service
 */
import prisma from "../../config/prisma";
import crypto from "crypto";

export const requestSnapToken = async (orderId: number) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { user: true },
  });

  if (!order) throw new Error("Pesanan tidak ditemukan");

  const snapToken = `SNAP-${crypto.randomBytes(8).toString("hex")}`;

  await prisma.payment.upsert({
    where: { orderId },
    update: { snapToken },
    create: {
      orderId,
      method: "midtrans",
      amount: order.total,
      snapToken,
    },
  });

  return { snapToken };
};

export const handleWebhook = async (payload: any) => {
  const { order_id, transaction_status, transaction_id } = payload;
  const orderCode = order_id;

  const order = await prisma.order.findUnique({
    where: { orderCode },
  });

  if (!order) throw new Error("Pesanan tidak ditemukan");

  let paymentStatus: any = "pending";
  if (["capture", "settlement"].includes(transaction_status)) paymentStatus = "success";
  if (["deny", "cancel", "expire"].includes(transaction_status)) paymentStatus = "failed";

  await prisma.payment.update({
    where: { orderId: order.id },
    data: {
      status: paymentStatus,
      transactionId: transaction_id,
      paidAt: paymentStatus === "success" ? new Date() : null,
    },
  });

  return { message: "Webhook processed" };
};
