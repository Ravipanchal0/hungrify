import React, { useState, useContext, useEffect } from "react";

import { StoreContext } from "../Context/StoreContext";
import {
  fetchMenuItems,
  deleteMenuItem,
  updateMenuAvailability,
  getItemById,
  editItemDetails,
} from "../controller/itemController.js";
import { MdDelete } from "react-icons/md";
import { MdEditSquare } from "react-icons/md";

import { toast } from "react-toastify";

const Products = () => {
  const { menuCategories } = useContext(StoreContext);
  const [list, setList] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    discount: "",
  });

  const fetchMenu = async () => {
    const response = await fetchMenuItems();
    if (response) {
      setList(response.data);
    }
  };

  const handleAvailabilityChange = async (e, itemId) => {
    const newAvailability = e.target.value;
    const toastId = toast.loading("Updating availability");

    try {
      const response = await updateMenuAvailability(itemId, newAvailability);
      if (response.success) {
        toast.update(toastId, {
          render: "Availability updated",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        fetchMenu();
      } else {
        toast.update(toastId, {
          render: "Failed to update availability",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
        fetchMenu();
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleDelete = async (itemId) => {
    const toastId = toast.loading("Deleting item");
    try {
      const response = await deleteMenuItem(itemId);
      if (response.success) {
        toast.update(toastId, {
          render: "Item deleted successfully",
          type: "success",
          isLoading: false,
          autoClose: 1000,
        });
        fetchMenu();
      } else {
        toast.update(toastId, {
          render: "Could not delete the item",
          type: "error",
          isLoading: false,
          autoClose: 1000,
        });
      }
    } catch (error) {
      toast.update(toastId, {
        render: "Something went wrong",
        type: "error",
        isLoading: false,
        autoClose: 1000,
      });
    }
  };

  const handleEdit = async (itemId) => {
    try {
      const item = await getItemById(itemId);
      setItemToEdit(item);
      setEditForm({
        name: item.name,
        price: item.price,
        category: item.category,
        description: item.description,
        discount: item.discount,
      });
      setEditModalOpen(true);
    } catch {
      toast.error("Failed to load item details");
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const toastId = toast.loading("Updating item...");
    try {
      const res = await editItemDetails(itemToEdit._id, editForm);
      toast.update(toastId, {
        render: res.message || "Item updated",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
      setEditModalOpen(false);
      fetchMenu();
    } catch (error) {
      toast.update(toastId, {
        render: "Update failed",
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  return (
    <div className="w-full p-0.5 md:p-5 mb-5">
      <div className="header mb-2 md:mb-5">
        <h3 className="text-2xl font-medium text-gray-800">Menus</h3>
        <p className="text-gray-500 text-sm">
          Hi, Ravi Panchal. Welcome back to Hungrify Admin!
        </p>
      </div>

      {/* EDIT MODAL */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-2xl animate-zoom">
            <h3 className="text-xl font-medium mb-4">Edit Item</h3>
            <form
              onSubmit={handleEditSubmit}
              className="product-form flex flex-col gap-6 w-full"
            >
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
                  required
                  value={editForm.name}
                  onChange={handleEditFormChange}
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
                  value={editForm.description}
                  onChange={handleEditFormChange}
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
                    value={editForm.price}
                    onChange={handleEditFormChange}
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
                    value={editForm.discount}
                    onChange={handleEditFormChange}
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
                  value={editForm.category}
                  onChange={handleEditFormChange}
                  required
                  className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {menuCategories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end mt-2 gap-x-5">
                <button
                  type="button"
                  onClick={() => setEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400/60 rounded cursor-pointer transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-500/90 text-white rounded cursor-pointer transition-all duration-150"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Display menu item */}
      <div className="menu-display">
        <div className="Product-list shadow rounded">
          {/* Header Row */}
          <div className="header grid grid-cols-[2.5fr_2fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] font-medium border-b border-b-gray-300 p-4 bg-slate-100 text-gray-700">
            <div className="">Image</div>
            <div className="">Name</div>
            <div className="">Category</div>
            <div>Price</div>
            <div>Discount</div>
            <div>Action</div>
            <div>Avaibility</div>
          </div>

          {/* Data Rows Container */}
          <div className="data overflow-y-auto md:max-h-[64vh]">
            {/* One data row */}
            {list.map((item) => {
              return (
                <div
                  key={item._id}
                  className={`data-content grid grid-cols-[2.5fr_2fr_1.5fr_1.2fr_1.2fr_1fr_1.5fr] items-center p-4 border-b border-b-gray-200 ${
                    !item.isAvailable ? "bg-red-50 text-gray-500" : ""
                  }`}
                >
                  <div className="img">
                    <img
                      src={item.image}
                      alt="product"
                      className="max-w-12 md:max-w-22 object-cover rounded"
                    />
                  </div>
                  <div className="text-gray-800 text-sm md:text-normal md:ml-1">
                    {item.name}
                  </div>
                  <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                    {item.category}
                  </div>
                  <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                    &#x20B9; {item.price}
                  </div>
                  <div className="text-gray-600 text-sm md:text-normal md:ml-2">
                    {item.discount}
                  </div>
                  <div className="action flex gap-x-2 md:gap-x-5 md:ml-2">
                    <button
                      onClick={() => handleEdit(item._id)}
                      className="text-blue-500 text-2xl cursor-pointer hover:text-blue-400"
                    >
                      <MdEditSquare />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 text-2xl cursor-pointer hover:text-red-400"
                    >
                      <MdDelete />
                    </button>
                  </div>
                  <div className="availability">
                    <select
                      name="isAvailable"
                      value={item.isAvailable}
                      onChange={(e) => handleAvailabilityChange(e, item._id)}
                      className={`md:px-2 md:py-1.5 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                        item.isAvailable
                          ? "border-green-400 ring-green-200"
                          : "border-red-400 ring-red-200"
                      }`}
                    >
                      <option value="true">Available</option>
                      <option value="false">Not Available</option>
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
