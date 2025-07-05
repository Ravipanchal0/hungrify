import express from "express";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.js";

const app = express(); // Initialize the Express application

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cors());

//api endpoints
import menuItemRoutes from "./routes/menuItemRoutes.js";

app.use("/api/menuitem", menuItemRoutes);

// Middleware for handling errors
app.use(errorHandler);

export default app;
