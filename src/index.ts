import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

import authRoutes from "./modules/auth/auth.routes";
import userRoutes from "./modules/user/user.routes";
import addressRoutes from "./modules/address/address.routes";
import regionRoutes from "./modules/region/region.routes";
import categoryRoutes from "./modules/category/category.routes";
import productRoutes from "./modules/product/product.routes";
import cartRoutes from "./modules/cart/cart.routes";
import orderRoutes from "./modules/order/order.routes";
import paymentRoutes from "./modules/payment/payment.routes";
import reportRoutes from "./modules/report/report.routes";
import { errorResponse } from "./utils/response";

const app = express();
const PORT = process.env.PORT || 3052;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/reports", reportRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return errorResponse(res, 500, "Internal server error")
});

app.get("/", (req, res) => {
  res.json({ message: "Server is running on port " + PORT });
});

app.listen(PORT, () => {
  console.info(`Server is running on port http://localhost:${PORT}`);
});
