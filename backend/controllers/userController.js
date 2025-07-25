import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { v4 as uuid } from "uuid";

// @desc    Get user
// @route   GET /api/user/profile
// @access  private/user
const getUser = asyncHandler(async (req, res) => {
  const { userId } = req.body.userId;
  const user = await userModel.findById(userId).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

// @desc    edit user details
// @route   PUT /api/user/profile
// @access  private/user
const editUserDetails = asyncHandler(async (req, res) => {
  const { name, email, userId } = req.body;

  if ([name, email].some((field) => field === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await userModel.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      name,
      email,
    },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, "User profile updated successfully", updatedUser)
    );
});

// @desc    user password change
// @route   PUT /api/user/profile/passwordChange
// @access  private/user
const passwordChange = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword, userId } = req.body;

  if (!oldPassword || !newPassword) {
    throw new ApiError(400, "Both old and new passwords are required");
  }

  const user = await userModel.findById(userId).select("+password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isMatch = await user.isPasswordMatched(oldPassword);
  if (!isMatch) {
    throw new ApiError(401, "Old password is incorrect");
  }

  // Set new password and save
  user.password = newPassword; // will be hashed by pre-save hook
  await user.save();

  res.status(200).json(new ApiResponse(200, "Password changed successfully"));
});

// @desc    get all saved address
// @route   POST /api/user/profile/addresses
// @access  private/user
const getSavedAddresses = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const user = await userModel.findById(userId).select("savedAddress");
  res.json(
    new ApiResponse(
      200,
      "Saved addresses feched successfully",
      user.savedAddress
    )
  );
});

// @desc    saved new address
// @route   POST /api/user/profile/address
// @access  private/user
const saveNewAddress = asyncHandler(async (req, res) => {
  const { name, phone, city, pincode, ...rest } = req.body;

  const user = await userModel.findById(req.body.userId);
  const addr_id = uuid();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isDuplicate = user.savedAddress.some(
    (addr) =>
      addr.name === name &&
      addr.phone === phone &&
      addr.city === city &&
      addr.pincode === pincode
  );

  if (isDuplicate) {
    return res.json({ success: false, message: "Address already saved" });
  }

  user.savedAddress.push({ id: addr_id, name, phone, city, pincode, ...rest });
  await user.save();

  res
    .status(200)
    .json(
      new ApiResponse(200, "Address saved successfully", user.savedAddress)
    );
});

// @desc    delete saved address
// @route   POST /api/user/profile/address/delete
// @access  private/user
const deleteSavedAddress = asyncHandler(async (req, res) => {
  const { userId, id } = req.body;

  // Step 1: Remove the address with the given id from savedAddress array
  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    {
      $pull: { savedAddress: { id: id } },
    },
    { new: true, select: "savedAddress" } // return the updated user document
  );

  if (!updatedUser) {
    return res.status(404).json(new ApiResponse(404, "User not found", null));
  }

  res.json(
    new ApiResponse(
      200,
      "Saved address deleted successfully",
      updatedUser.savedAddress
    )
  );
});

export {
  editUserDetails,
  passwordChange,
  getUser,
  getSavedAddresses,
  saveNewAddress,
  deleteSavedAddress,
};
