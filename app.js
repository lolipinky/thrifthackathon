import dotenv from "dotenv";
dotenv.config(); 

import express from 'express';
import { PORT } from './config/env.js';
import { connectDb } from './database/mongodb.js';
import createRouter from './routes/createAccRoute.js';
import checkoutRouter from "./routes/checkout.js";
import cookieParser from 'cookie-parser';
import cors from "cors";
import categoryRouter from "./routes/category.route.js";
import productRouter from "./routes/product.route.js";
import wishlistRouter from "./routes/wishlist.route.js";
import adminRouter from "./routes/admin.route.js";
import groupRouter from "./routes/group.route.js";
import contributionRouter from "./routes/contribution.route.js";
import { startContributionReminder } from "./services/contribution.reminder.js";
import webhookRouter from "./routes/webhook.route.js"
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger.js";
import orderRouter from "./routes/order.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: ["http://localhost:5000","http://localhost:5173","https://thrift-app-five.vercel.app"],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use("/api/v1/account", createRouter);
app.use("/api/v1/checkout", checkoutRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/wishlist", wishlistRouter)
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/group", groupRouter);
app.use("/api/v1/orders", orderRouter)
app.use("/api/v1/contribution", contributionRouter)
app.use(
  "/api/v1/webhook",
  express.raw({ type: "application/json" }),
  webhookRouter
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  connectDb();
  console.log("server is running on PORT");
  startContributionReminder();
});



