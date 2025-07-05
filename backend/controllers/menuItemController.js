import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import menuItemModel from "../models/menuItemModel.js";
import fs from "fs";

// @desc    add menu items
// @route   POST /api/menuitmes/add
// @access  Private/Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description, category } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !price || !description || !category) {
    res.status(400);
    throw new ApiError(404, "Please fill all the fields");
  }

  const menuItem = await menuItemModel.create({
    name,
    price,
    description,
    category,
    image,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Menu item added successfully", menuItem));
});

export { addMenuItem };
