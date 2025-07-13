import asyncHandler from "express-async-handler";
import ApiResponse from "../utils/ApiResponse.js";
import userModel from "../models/userModel.js";

//@desc add to cart
//@route POST
const addToCart = asyncHandler(async (req, res) => {
  const { itemId } = req.body;
  const userId = req.body.userId;

  const user = await userModel.findById({ _id: userId });
  let cartData = user.cartData;

  if (!cartData[itemId]) {
    cartData[itemId] = 1;
  } else {
    cartData[itemId] += 1;
  }

  user.cartData = cartData;
  await user.save();
  //   const userWithUpdatedCart = await userModel.findByIdAndUpdate(
  //     userId,
  //     { cartData },
  //     { new: true }
  //   );
  res.status(200).json(
    new ApiResponse(201, "Item added to cart successfully", {
      user: cartData,
    })
  );
});

//@desc remove from cart
//@route POST
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const { itemId } = req.body;

  const user = await userModel.findById({ _id: userId });
  let cartData = user.cartData;
  if (cartData[itemId] > 0) {
    cartData[itemId] -= 1;
  }
  user.cartData = cartData;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, "item removed from cart", cartData));
});

//@desc get all item of cart
//@route GET
const getCart = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  const user = await userModel.findById({ _id: userId });
  res
    .status(200)
    .json(
      new ApiResponse(200, "cart data fetched successfully", user.cartData)
    );
});

export { addToCart, removeFromCart, getCart };
