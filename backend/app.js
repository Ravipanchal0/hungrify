import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";
import Razorpay from "razorpay";

const app = express(); // Initialize the Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Parse origins from .env
const allowedOrigins = process.env.ORIGINS?.split(",") || [];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Success" });
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
