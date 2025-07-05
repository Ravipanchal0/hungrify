import { v2 as cloudinary } from "cloudinary";
import ApiError from "./ApiError.js";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (localStoragePath) => {
  try {
    if (!localStoragePath) {
      throw new ApiError(404, "No image file found to upload");
    }

    const uploadResult = await cloudinary.uploader.upload(localStoragePath, {
      resource_type: "auto",
    });
    if (uploadResult) {
      fs.unlinkSync(localStoragePath); // Clean up the local file
    }

    return uploadResult;
  } catch (error) {
    fs.unlinkSync(localStoragePath); // Clean up the local file
    throw new ApiError(500, "Error uploading image");
  }
};

export default uploadImage;
