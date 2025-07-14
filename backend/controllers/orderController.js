import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import ApiError from "../utils/ApiError.js";
import { razorpay } from "../app.js";

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

export { placeOrder, markOrderPaid };
