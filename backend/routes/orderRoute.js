import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  placeOrder,
  markOrderPaid,
  paymentVerification,
  fetchOrderById,
  cancelOrder,
  fetchAllOrders,
  fetchOrdersByStatus,
  updateOrderStatus,
} from "../controllers/orderController.js";

const router = express.Router();

router.route("/place").post(authMiddleware, placeOrder);
router.route("/cancel").post(authMiddleware, cancelOrder);
router.route("/verify").post(paymentVerification);
router.route("/payment-details/:orderId/:payment_id").get(fetchOrderById);
router.route("/mark-paid/:orderId").put(markOrderPaid);

router.route("/orders").get(fetchAllOrders);
router.route("/byStatus").post(fetchOrdersByStatus);
router.route("/status").patch(updateOrderStatus);

export default router;
