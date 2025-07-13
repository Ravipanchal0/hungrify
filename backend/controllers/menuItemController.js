import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import itemModel from "../models/itemModel.js";
import uploadImage from "../utils/uploadImage.js";
import deleteImage from "../utils/deleteImage.js";

// @desc    add menu items
// @route   POST /api/menuitmes/add
// @access  Private/Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description, category, discount, isAvailable } =
    req.body;
  const imageLocalPath = req.file ? req.file.path : null;

  if (!name || !price || !description || !category) {
    throw new ApiError(400, "Please fill all the fields");
  }

  if (!imageLocalPath) {
    throw new ApiError(400, "Image is required!");
  }
  var imageUrl;
  if (imageLocalPath) {
    imageUrl = await uploadImage(imageLocalPath);
  }

  const menuItem = await itemModel.create({
    name,
    price,
    description,
    category,
    image: imageUrl.url || null,
    discount: discount ? parseFloat(discount) : 0,
    isAvailable,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "Menu item added successfully", menuItem));
});

// @desc    get all menu items
// @route   GET /api/menuitme/menulist
// @access  Public
const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await itemModel.find({});

  res
    .status(200)
    .json(new ApiResponse(200, "Menu items fetched successfully", menuItems));
});

// @desc    get a menu item
// @route   GET /api/menuitme/menulist/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menuItem = await itemModel.findById(id);

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Menu item fetched successfully", menuItem));
});

// @desc    edit availability of a menu item
// @route   GET /api/menuitme/edit/:id/availability
// @access  Private/Admin
const itemAvailability = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isAvailable } = req.body;

  const menuItem = await itemModel.findByIdAndUpdate(
    id,
    { isAvailable },
    { new: true }
  );

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Availability updated successfully", menuItem));
});

// @desc    edit details of a menu item
// @route   PUT /api/menuitme/edit/:id
// @access  Private/Admin
const editMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, discount } = req.body;

  if (!name || !price || !description || !category) {
    throw new ApiError(400, "Please fill all the fields");
  }

  const menuItem = await itemModel.findById(id);

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  const updatedData = await itemModel.findByIdAndUpdate(
    id,
    {
      name: name,
      price: price,
      description: description,
      category: category,
      discount: discount,
    },
    { new: true }
  );

  if (!updatedData) {
    throw new ApiError(404, "Menu item not found");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Menu item status updated successfully", updatedData)
    );
});

// @desc    remove menu item
// @route   DELETE /api/menuitme/remove/:id
// @access  Private/Admin
const removeMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menuItem = await itemModel.findByIdAndDelete(id);
  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }
  if (menuItem.image) {
    // deleteImage is a utility function to remove the image from cloud storage
    await deleteImage(menuItem.image);
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Menu item removed successfully", menuItem));
});

export {
  addMenuItem,
  getAllMenuItems,
  getMenuItemById,
  editMenuItem,
  removeMenuItem,
  itemAvailability,
};
