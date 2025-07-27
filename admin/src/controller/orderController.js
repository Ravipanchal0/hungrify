import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

// 1. Fetch All Orders
const fetchAllOrders = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/order/orders`);
    if (response.data) {
      return response.data.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

// 2. Fetch Orders by Status
const fetchOrdersByStatus = async (status) => {
  try {
    const response = await axios.post(`${baseUrl}/api/order/byStatus`, {
      status,
    });
    if (response.data) {
      return response.data.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

// 3. Update Order Status
const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const response = await axios.patch(`${baseUrl}/api/order/status`, {
      orderId,
      status: newStatus,
    });
    if (response.data) {
      return response.data.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

export { fetchAllOrders, fetchOrdersByStatus, updateOrderStatus };
