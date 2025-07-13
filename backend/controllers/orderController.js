import asyncHandler from "express-async-handler";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import stripe from "stripe";

//Placing user order for frontend
const placeOrder = asyncHandler(async (req, res) => {});

export { placeOrder };
