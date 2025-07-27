import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteImage = async (imageUrl) => {
  try {
    if (!imageUrl) {
      throw new Error("No image URL provided for deletion");
    }
    const parts = imageUrl.split("/upload/")[1]; // => v1234567890/sample-folder/sample-image.jpg

    // Remove version
    const withoutVersion = parts.split("/").slice(1).join("/"); // => sample-folder/sample-image.jpg

    const publicId = withoutVersion.replace(/\.[^/.]+$/, ""); // => sample-folder/sample-image

    const result = await cloudinary.uploader.destroy(publicId);
    return result;
  } catch (error) {
    throw new Error("Error deleting image");
  }
};

export default deleteImage;
