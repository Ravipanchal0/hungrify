import React, { useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { addItem } from "../controller/itemController";

const Home = () => {
  const initialFormData = {
    isAvailable: true,
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
    image: null,
  };

  const [image, setImage] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("discount", formData.discount);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("isAvailable", formData.isAvailable);
    formDataToSend.append("image", formData.image); // ✅ important!

    try {
      const response = await addItem(formDataToSend);
      console.log("✅ Success:", response.data);

      // Reset form after success
      setFormData(initialFormData);
      setImage(false);
    } catch (error) {
      console.error("❌ Upload failed:", error.message);
    }
  };

  return (
    <div className="w-full p-5">
      <h3 className="text-2xl mb-4">Product Details</h3>
      <form
        onSubmit={handleSubmit}
        className="product-form flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md w-full"
      >
        {/* Availability */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="availability"
            className="text-sm font-medium text-gray-700"
          >
            Availability
          </label>
          <select
            name="isAvailable"
            id="availability"
            value={formData.isAvailable}
            onChange={handleOnChange}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            required
          >
            <option value="true" defaultChecked>
              Available
            </option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Upload Image */}
        <div className="upload-image flex flex-col gap-2">
          <p className="text-sm font-medium text-gray-700">Upload Image</p>
          <label
            htmlFor="item-img"
            className="cursor-pointer border border-dashed border-amber-500 rounded-md p-4 md:py-8 flex items-center justify-center hover:bg-amber-50 transition"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt=""
                className="size-24 object-cover bg-center"
              />
            ) : (
              <BiImageAdd size={32} />
            )}
          </label>
          <input
            type="file"
            name="image"
            id="item-img"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="item-name"
            className="text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="name"
            id="item-name"
            value={formData.name}
            required
            onChange={handleOnChange}
            placeholder="Ex. Veg Roll"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="item-desc"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="item-desc"
            value={formData.description}
            onChange={handleOnChange}
            required
            placeholder="Ex. Tasty and stuffed veg rolls, perfect for snacking."
            rows="3"
            className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full">
          {/* Price */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="item-price"
              className="text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="item-price"
              value={formData.price}
              onChange={handleOnChange}
              required
              placeholder="Enter price"
              min="0"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Discount Price */}
          <div className="flex flex-col gap-2 w-full">
            <label
              htmlFor="item-discount"
              className="text-sm font-medium text-gray-700"
            >
              Discount Price
            </label>
            <input
              type="number"
              name="discount"
              id="item-discount"
              value={formData.discount}
              onChange={handleOnChange}
              placeholder="Enter discount price"
              min="0"
              step="0.01"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Category */}
        <div className="flex flex-col gap-2 w-full">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            name="category"
            id="category"
            onChange={handleOnChange}
            value={formData.category}
            required
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="salad">Salad</option>
            <option value="rolls">Rolls</option>
            <option value="desserts">Desserts</option>
            <option value="sandwich">Sandwich</option>
            <option value="cake">Cake</option>
            <option value="pure veg">Pure Veg</option>
            <option value="pasta">Pasta</option>
            <option value="noddles">Noddles</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 self-start px-6 py-2 bg-amber-500 text-white text-sm font-medium rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Home;
