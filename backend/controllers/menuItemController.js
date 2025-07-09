import asyncHandler from "express-async-handler";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import menuItemModel from "../models/menuItemModel.js";
import uploadImage from "../utils/uploadImage.js";
import deleteImage from "../utils/deleteImage.js";

// @desc    add menu items
// @route   POST /api/menuitmes/add
// @access  Private/Admin
const addMenuItem = asyncHandler(async (req, res) => {
  const { name, price, description, category, discount } = req.body;
  const imageLocalPath = req.file ? req.file.path : null;
  console.log(req.body, imageLocalPath);
  if (!name || !price || !description || !category) {
    throw new ApiError(400, "Please fill all the fields");
  }
  var imageUrl;
  if (imageLocalPath) {
    imageUrl = await uploadImage(imageLocalPath);
  }

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

// @desc    get all menu items
// @route   GET /api/menuitme/menulist
// @access  Public
const getAllMenuItems = asyncHandler(async (req, res) => {
  const menuItems = await menuItemModel.find({});

  if (!menuItems || menuItems.length === 0) {
    res
      .status(200)
      .json(new ApiResponse(200, "No menu items found", menuItems));
  }
  res
    .status(200)
    .json(new ApiResponse(200, "Menu items fetched successfully", menuItems));
});

// @desc    get a menu item
// @route   GET /api/menuitme/menulist/:id
// @access  Public
const getMenuItemById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const menuItem = await menuItemModel.findById(id);

  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Menu item fetched successfully", menuItem));
});

// @desc    edit details of a menu item
// @route   GET /api/menuitme/edit/:id
// @access  Private/Admin
const editMenuItem = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, description, category, discount, isAvailable } =
    req.body;

  const menuItem = await menuItemModel.findById(id);
  if (!menuItem) {
    throw new ApiError(404, "Menu item not found");
  }

  const updatedData = await menuItemModel.findByIdAndUpdate(
    id,
    {
      name: name || menuItem.name,
      price: price || menuItem.price,
      description: description || menuItem.description,
      category: category || menuItem.category,
      discount:
        discount !== undefined && discount !== null
          ? parseFloat(discount)
          : menuItem.discount,
      isAvailable:
        typeof isAvailable === "boolean" ? isAvailable : menuItem.isAvailable,
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
  const menuItem = await menuItemModel.findByIdAndDelete(id);
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
};
