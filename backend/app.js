import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

const app = express(); // Initialize the Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

import menuItemRoutes from "./routes/menuItemRoutes.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js";

//api endpoints
app.use("/api/menuitem", menuItemRoutes);
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);

// Middleware for handling errors
app.use(errorHandler);

export default app;
