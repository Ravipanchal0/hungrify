import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import Razorpay from "razorpay";

const app = express(); // Initialize the Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

import menuItemRoutes from "./routes/menuItemRoutes.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import orderRouter from "./routes/orderRoute.js";

//api endpoints
app.use("/api/menuitem", menuItemRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Middleware for handling errors
app.use(errorHandler);

export default app;
