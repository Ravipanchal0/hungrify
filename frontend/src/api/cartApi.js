import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//add to cart api
const addItemToCart = async (itemId, token) => {
  try {
    await axios.post(
      `${baseUrl}/api/cart/add`,
      { itemId },
      { headers: { token } }
    );
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

//remove from cart
const removeItemFromCart = async (itemId, token) => {
  try {
    await axios.post(
      `${baseUrl}/api/cart/remove`,
      { itemId },
      { headers: { token } }
    );
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

//delete item from cart
const deleteItemFromCart = async (itemId, token) => {
  try {
    await axios.post(
      `${baseUrl}/api/cart/delete`,
      { itemId },
      { headers: { token } }
    );
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

// get cart items
const getCartItems = async (token) => {
  try {
    const res = await axios.post(
      `${baseUrl}/api/cart/items`,
      {},
      { headers: { token } }
    );
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

export { addItemToCart, removeItemFromCart, deleteItemFromCart, getCartItems };
