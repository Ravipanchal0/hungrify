import { createContext, useState, useEffect } from "react";
import { getUserByToken } from "../api/authApi.js";
import { getMenuList } from "../api/menuApi.js";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [food_list, setFood_list] = useState([]);

  //Add item into cart
  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };

  //Remove item quantity from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };

  //Delete item from cart
  const deleteFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };

  //Calculating order amount
  const getTotalCartAmount = () => {
    return food_list
      .reduce((acc, item) => {
        return acc + item.price * (cartItems[item._id] || 0);
      }, 0)
      .toFixed(2);
  };

  //refresh token while page refresh
  const refreshToken = async () => {
    const incomingToken = localStorage.getItem("token");
    if (incomingToken) {
      setToken(incomingToken);
      const user = await getUserByToken(incomingToken);
      setUser(user.data);
    }
  };

  //Get item list
  const getItemList = async () => {
    const itemList = await getMenuList();
    setFood_list(itemList);
  };

  useEffect(() => {
    getItemList();
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
