import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import menuItemModel from "../models/menuItemModel.js";
import uploadImage from "../utils/uploadImage.js";

// @desc    add menu items
// @route   POST /api/menuitmes/add
// @access  Private/Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description, category, discount } = req.body;
  const imageLocalPath = req.file ? req.file.path : null;

  if (!name || !price || !description || !category) {
    res.status(400);
    throw new ApiError(404, "Please fill all the fields");
  }

  const imageUrl = await uploadImage(imageLocalPath);

  const menuItem = await menuItemModel.create({
    name,
    price,
    description,
    category,
    image: imageUrl.url || null,
    discount: discount ? parseFloat(discount) : 0,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Menu item added successfully", menuItem));
});

export { addMenuItem };
