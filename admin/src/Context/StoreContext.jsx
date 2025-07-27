import { createContext, useState, useEffect } from "react";

import {
  fetchAllOrders,
  fetchOrdersByStatus,
  updateOrderStatus,
} from "../controller/orderController.js";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const menuCategories = [
    "Regional Indian",
    "Indian Snacks",
    "Main Course",
    "Fast Food",
    "Desserts",
    "Beverages",
  ];

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 1. Fetch All Orders
  const fetchAllOrdersList = async () => {
    try {
      setLoading(true);
      const data = await fetchAllOrders();
      setOrders(data);
      return data;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Fetch Orders by Status
  const fetchOrderListByStatus = async (status) => {
    try {
      setLoading(true);
      const data = await fetchOrdersByStatus(status);
      setOrders(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Update Order Status
  const changeOrderStatus = async (orderId, newStatus) => {
    const prev = orders;

    // optimistic UI update
    setOrders((prevOrders) =>
      prevOrders.map((o) =>
        o._id === orderId ? { ...o, status: newStatus } : o
      )
    );

    try {
      const updatedOrder = await updateOrderStatus(orderId, newStatus);
      // if backend returns the whole updated order, you can ensure it's in sync:
      if (updatedOrder?._id) {
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o._id === updatedOrder._id ? updatedOrder : o))
        );
      }
      return updatedOrder;
    } catch (err) {
      // rollback
      setOrders(prev);
      throw err;
    }
  };

  useEffect(() => {
    (async () => {
      await fetchAllOrdersList();
    })();
  }, []);

  const contextValue = {
    menuCategories,
    orders,
    loading,
    error,
    fetchAllOrdersList,
    fetchOrderListByStatus,
    changeOrderStatus,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
