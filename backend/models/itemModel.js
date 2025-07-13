import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0, // Default discount is 0%
    },
    image: String,
    category: String, // e.g., Pizza, Drinks
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const MenuItem = mongoose.model("MenuItem", itemSchema);
export default MenuItem;
