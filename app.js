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
app.use("/api/v1/category", categoryRouter)

app.listen(PORT, () => {
  connectDb();
  console.log("server is running on PORT", PORT);
});



