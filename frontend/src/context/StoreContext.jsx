import { createContext, useState, useEffect } from "react";
import { food_list } from "../assets/assets.js";
import { getUserByToken } from "../api/authApi.js";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  const getTotalCartAmount = () => {
    return food_list
      .reduce((acc, item) => {
        return acc + item.discount_price * (cartItems[item._id] || 0);
      }, 0)
      .toFixed(2);
  };

  const refreshToken = async () => {
    const incomingToken = localStorage.getItem("token");
    if (incomingToken) {
      setToken(incomingToken);
      const user = await getUserByToken(incomingToken);
      setUser(user.data);
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    deleteFromCart,
    getTotalCartAmount,
    token,
    setToken,
    user,
    setUser,
    showLogin,
    setShowLogin,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
