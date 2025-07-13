import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: { type: Array, required: true },
    totalAmount: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: Object,
      required: true,
    },
    status: {
      type: String,
      // enum: [
      //   "pending",
      //   "confirmed",
      //   "preparing",
      //   "on the way",
      //   "delivered",
      //   "cancelled",
      // ],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      // enum: ["pending", "paid"],
      default: "pending",
    },
    // paymentMethod: {
    //   type: String,
    //   enum: ["COD", "Online"],
    //   default: "COD",
    // },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
