import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { placeOrder, markOrderPaid } from "../controllers/orderController.js";

const router = express.Router();

router.route("/place").post(authMiddleware, placeOrder);
router.route("/mark-paid/:orderId").put(markOrderPaid);

export default router;
