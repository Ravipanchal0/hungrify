import axios from "axios";

const baseUrl = "http://localhost:3001/api";

//Get menu list
const getMenuList = async () => {
  try {
    const response = await axios(`${baseUrl}/menuitem/menulist`);
    if (response.data.success) {
      return response.data.data;
    }
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || "Something went wrong!";
    throw new Error(errorMessage);
  }
};

export { getMenuList };
