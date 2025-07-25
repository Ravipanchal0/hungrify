import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { v4 as uuid } from "uuid";

// @desc    Get user
// @route   GET /api/user/profile
// @access  private/user
const getUser = asyncHandler(async (req, res) => {});

// @desc    edit user details
// @route   PUT /api/user/profile
// @access  private/user
const editUserDetails = asyncHandler(async (req, res) => {});

// @desc    user password change
// @route   PUT /api/user/profile/passwordChange
// @access  private/user
const passwordChange = asyncHandler(async (req, res) => {});

// @desc    get all saved address
// @route   GET /api/user/profile/address
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

// @desc    get all saved address
// @route   GET /api/user/profile/address
// @access  private/user
const deleteSavedAddress = asyncHandler(async (req, res) => {
  const userId = req.body.userId;
  const { id } = req.body;
  const user = await userModel.findById(userId).select("savedAddress");
  res.json(
    new ApiResponse(
      200,
      "Saved addresses feched successfully",
      user.savedAddress
    )
  );
});

export {
  editUserDetails,
  passwordChange,
  getUser,
  getSavedAddresses,
  saveNewAddress,
};
