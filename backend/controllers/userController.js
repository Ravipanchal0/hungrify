import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import validator from "validator";

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

export { editUserDetails, passwordChange, getUser };
