import React, { useContext, useState } from "react";
import { BiImageAdd } from "react-icons/bi";
import { addItem } from "../controller/itemController";
import { toast } from "react-toastify";
import { StoreContext } from "../Context/StoreContext";

const Home = () => {
  const { menuCategories } = useContext(StoreContext);
  const initialFormData = {
    isAvailable: true,
    name: "",
    description: "",
    price: "",
    discount: "",
    category: "",
  };

  const [image, setImage] = useState(false);
  const [data, setData] = useState(initialFormData);

  const handleOnChange = (e) => {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", data.name);
    formDataToSend.append("description", data.description);
    formDataToSend.append("price", data.price);
    formDataToSend.append("discount", data.discount);
    formDataToSend.append("category", data.category);
    formDataToSend.append("isAvailable", data.isAvailable);
    formDataToSend.append("image", image); // ✅ important!

    // Show loading toast
    const toastId = toast.loading("Adding item");

    try {
      const response = await addItem(formDataToSend);

      if (response?.data?.success) {
        toast.update(toastId, {
          render: response.data.message,
          type: "success",
          isLoading: false,
          autoClose: 1000,
          closeOnClick: true,
        });

        // Reset form after success
        setData(initialFormData);
        setImage(false);
      } else {
        toast.update(toastId, {
          render: "Failed to add item",
          type: "error",
          isLoading: false,
          autoClose: 2000,
          closeOnClick: true,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: error.message || "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="w-full p-1 md:p-5">
      <div className="header mb-2 md:mb-5">
        <h3 className="text-2xl font-medium text-gray-800">Add New Item</h3>
        <p className="text-gray-500 text-sm">
          Hi, Ravi Panchal. Welcome back to Hungrify Admin!
        </p>
      </div>
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
            value={data.isAvailable}
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
            value={data.name}
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
            value={data.description}
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
              value={data.price}
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
              value={data.discount}
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
            value={data.category}
            required
            className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            {menuCategories.map((category) => (
              <option value={category.menu_name}>{category.menu_name}</option>
            ))}
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
