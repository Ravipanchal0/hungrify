import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import validator from "validator";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateToken, verifyToken } from "../utils/jwtToken.js";

// @desc    login user
// @route   POST /api/user/login
// @access  public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(404, "Email doesn't have any account");
  }

  const passwordMatch = await user.isPasswordMatched(password);
  if (!passwordMatch) {
    throw new ApiError(401, "Invalid credentials");
  }

  const token = generateToken(user._id, email);
  const loggedInUser = await userModel.findById({ _id: user._id });

  res.status(200).json(
    new ApiResponse(200, "Logged in successfully", {
      token,
      user: loggedInUser,
    })
  );
});

// @desc    register user
// @route   POST /api/user/register
// @access  public
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  if (!validator.isEmail(email)) {
    throw new ApiError(400, "Enter a valid email");
  }

  if (password.length < 8) {
    throw new ApiError(400, "Password should be 8 character");
  }

  const user = await userModel.findOne({ email });
  if (user) {
    throw new ApiError(400, "Email already exist");
  }

  const newUser = await userModel.create({
    name,
    email,
    password,
  });
  if (!newUser) {
    throw new ApiError(400, "Account creation failed");
  }

  const token = generateToken(newUser._id, newUser.email);

  res.status(200).json(
    new ApiResponse(201, "Account created successfully", {
      token,
      user: newUser,
    })
  );
});

// @desc    logout user
// @route   POST /api/user/logout
// @access  private/user
const logout = asyncHandler(async (req, res) => {});

const getUserByToken = asyncHandler(async (req, res) => {
  const { token } = req.body;
  if (!token) {
    throw new ApiError(401, "You are singed out");
  }

  const decodedToken = verifyToken(token);
  if (!decodedToken) {
    throw new ApiError(401, "You are singed out");
  }

  const user = await userModel.findById(decodedToken.id);

  res.status(200).json(new ApiResponse(200, "User fetched successfully", user));
});

export { login, logout, register, getUserByToken };
