import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { placeOrder } from "../controllers/orderController.js";

const router = express.Router();

router.route("/place").post(authMiddleware, placeOrder);

export default router;
