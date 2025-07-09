import axios from "axios";

const baseUrl = "http://localhost:3001";
// add item
const addItem = async (formData) => {
  try {
    // console.log(formData);
    const response = await axios.post(`${baseUrl}/api/menuitem/add`, formData);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export { addItem };
