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
    console.log("item controller : ", response.data);
    if (response.data) {
      return response.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

export { addItem, fetchMenuItems };
