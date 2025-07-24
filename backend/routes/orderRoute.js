import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  placeOrder,
  markOrderPaid,
  paymentVerification,
  fetchOrderById,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/place").post(authMiddleware, placeOrder);
router.route("/verify").post(paymentVerification);
router.route("/payment-details/:orderId/:payment_id").get(fetchOrderById);
router.route("/mark-paid/:orderId").put(markOrderPaid);

export default router;
