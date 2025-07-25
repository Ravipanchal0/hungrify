import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    cartData: {
      type: Object,
      default: {},
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    savedAddress: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true, minimize: false }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // only hash if password is new or modified

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
