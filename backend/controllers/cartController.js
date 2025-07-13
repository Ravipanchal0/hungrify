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
  const userWithUpdatedCart = await userModel.findByIdAndUpdate(
    user._id,
    { cartData },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        201,
        "Item added to cart successfully",
        userWithUpdatedCart
      )
    );
});

//@desc decrease item quantity from cart
//@route POST
const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const { itemId } = req.body;

  const user = await userModel.findById({ _id: userId });
  let cartData = user.cartData;

  if (cartData[itemId] && cartData[itemId] > 0) {
    cartData[itemId] -= 1;

    // If quantity is now 0, remove the item from cartData
    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }
  }
  const userWithUpdatedCart = await userModel.findByIdAndUpdate(
    user._id,
    { cartData },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, "item removed from cart", userWithUpdatedCart));
});

//@desc delete item from cart
//@route POST
const deleteFromCart = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const { itemId } = req.body;

  const user = await userModel.findById({ _id: userId });
  let cartData = user.cartData;

  if (cartData[itemId]) {
    delete cartData[itemId];
  }
  const userWithUpdatedCart = await userModel.findByIdAndUpdate(
    user._id,
    { cartData },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, "item deleted from cart", userWithUpdatedCart));
});

//@desc get all item of cart
//@route GET
const getCart = asyncHandler(async (req, res) => {
  const userId = req.body.userId;

  const user = await userModel.findById({ _id: userId });
  res
    .status(200)
    .json(
      new ApiResponse(200, "cart data fetched successfully", user.cartData)
    );
});

export { addToCart, removeFromCart, deleteFromCart, getCart };
