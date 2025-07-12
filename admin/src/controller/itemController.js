import axios from "axios";

const baseUrl = "http://localhost:3001";
// add item
const addItem = async (formData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/menuitem/add`, formData);
    if (response.data) {
      return response;
    } else {
      return response;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

// List menu items
const fetchMenuItems = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/menuitem/menulist`);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

//Fetch item by id
const getItemById = async (itemId) => {
  try {
    const response = await axios.get(
      `${baseUrl}/api/menuitem/menulist/${itemId}`
    );
    return response.data.data;
  } catch (error) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

//Delete item
const deleteMenuItem = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/api/menuitem/delete/${id}`);
    return response.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

//Update availability
const updateMenuAvailability = async (itemId, isAvailable) => {
  try {
    const res = await axios.patch(
      `${baseUrl}/api/menuitem/edit/${itemId}/availability`,
      {
        isAvailable,
      }
    );
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

//edit item details
const editItemDetails = async (itemId, formData) => {
  try {
    const response = await axios.put(
      `${baseUrl}/api/menuitem/edit/${itemId}`,
      formData
    );
    return response.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

export {
  addItem,
  fetchMenuItems,
  deleteMenuItem,
  updateMenuAvailability,
  getItemById,
  editItemDetails,
};
