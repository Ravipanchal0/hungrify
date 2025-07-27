import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { razorpay } from "../app.js";
import crypto from "crypto";

const placeOrder = asyncHandler(async (req, res) => {
  const { userId, items, totalAmount, deliveryAddress } = req.body;

  // Step 1: Save order in DB
  const newOrder = await orderModel.create({
    userId,
    items,
    totalAmount, // Already includes GST & delivery from frontend
    deliveryAddress,
  });

  // Step 2: Clear cart
  await userModel.findByIdAndUpdate(userId, { cartData: {} });
  const newOrderId = newOrder._id.toString();

  // Step 3: Create Razorpay Order (Amount must be in paise)
  const razorpayOrder = await razorpay.orders.create({
    amount: totalAmount * 100, // convert ₹ to paise
    currency: "INR",
    receipt: `order_rcptid_${newOrderId}`,
    notes: {
      orderId: newOrderId,
      userId: userId.toString(),
    },
  });

  if (razorpayOrder.id) {
    await userModel.findByIdAndUpdate(userId, {
      $push: { orders: newOrder._id },
    });
  }

  // Step 4: Send to frontend
  res.status(200).json(
    new ApiResponse(200, "Order created", {
      razorpayOrderId: razorpayOrder.id,
      key: process.env.RAZORPAY_KEY_ID,
      amount: totalAmount,
      currency: "INR",
      orderId: newOrder._id,
    })
  );
});

// Mark order as paid - No verification
const markOrderPaid = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderModel.findByIdAndUpdate(
    orderId,
    {
      paymentStatus: true,
    },
    { new: true }
  );

  if (!order) {
    throw new ApiError({ message: "Order not found" });
  }

  res.status(200).json(new ApiResponse(200, "Order marked as paid", order));
});

const paymentVerification = asyncHandler(async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    return res.redirect(
      `${process.env.FRONTEND_URL}/paymentSuccess?order_id=${razorpay_order_id}&payment_id=${razorpay_payment_id}`
    );
  } else {
    return res.redirect(`${process.env.FRONTEND_URL}/paymentFailed`);
  }
});

const fetchOrderById = asyncHandler(async (req, res) => {
  const { orderId, payment_id } = req.params;
  const order = await razorpay.orders.fetch(orderId);
  const paymentDetails = await razorpay.payments.fetch(payment_id);
  res.status(200).json(
    new ApiResponse(200, "Order fetched successfully", {
      order,
      paymentDetails,
    })
  );
});

// @desc    Cancel order by ID
// @route   POST /api/user/order/:orderId
// @access  Private/User
const cancelOrder = asyncHandler(async (req, res) => {
  const { orderId, userId } = req.body;

  if (!orderId) {
    throw new ApiError(400, "Order ID is required");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // Remove order from Order collection
  const order = await orderModel.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  // check if order belongs to the user
  if (String(order.userId) !== String(userId)) {
    throw new ApiError(403, "You are not allowed to cancel this order");
  }

  await orderModel.findByIdAndUpdate(
    orderId,
    {
      status: "cancelled",
      $unset: { userId: "" }, // This removes userId field from the order
    },
    { new: true }
  );

  // Remove order from user's orders list
  user.orders = user.orders.filter((id) => String(id) !== String(orderId));
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, "Order cancelled successfully", user.orders));
});

// @desc    Fetch all orders
// @route   GET /api/user/order/
// @access  Private/Admin
const fetchAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderModel.find({});
  res
    .status(200)
    .json(new ApiResponse(200, "Order fetched successfully", orders));
});

// @desc    Fetch orders by status
// @route   GET /api/user/order/
// @access  Private/Admin
const fetchOrdersByStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const validStatuses = [
    "pending",
    "confirmed",
    "preparing",
    "on the way",
    "delivered",
    "cancelled",
  ];

  if (!validStatuses.includes(status)) {
    return res.status(400).json(new ApiResponse(400, "Invalid status"));
  }

  const orders = await orderModel.find({ status });
  res
    .status(200)
    .json(
      new ApiResponse(200, `${status} orders fetched successfully`, orders)
    );
});

// @desc    Update order status by admin
// @route   PATCH /api/user/order/:orderId/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId, status } = req.body;

  // Find order and update
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    {
      status,
    },
    { new: true }
  );

  if (!order) {
    return res.status(404).json(new ApiResponse(404, "Order not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Order status updated successfully", order));
});

export {
  placeOrder,
  markOrderPaid,
  paymentVerification,
  fetchOrderById,
  cancelOrder,
  fetchAllOrders,
  fetchOrdersByStatus,
  updateOrderStatus,
};
