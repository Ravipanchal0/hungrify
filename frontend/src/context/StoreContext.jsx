import { createContext, useState, useEffect, lazy } from "react";
import { getUserByToken } from "../api/authApi.js";
import { getMenuList } from "../api/menuApi.js";
import {
  addItemToCart,
  removeItemFromCart,
  deleteItemFromCart,
  getCartItems,
} from "../api/cartApi.js";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const [food_list, setFood_list] = useState([]);

  //Add item into cart
  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await addItemToCart(itemId, token);
    }
  };

  //Remove item quantity from cart
  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await removeItemFromCart(itemId, token);
    }
  };

  //Delete item from cart
  const deleteFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
    if (token) {
      await deleteItemFromCart(itemId, token);
    }
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
      await loadCartData(incomingToken);
    }
  };

  //get cart items
  const loadCartData = async (token) => {
    const res = await getCartItems(token);
    setCartItems(res.data);
  };

  //Get item list
  const loadItemList = async () => {
    const itemList = await getMenuList();
    setFood_list(itemList);
  };

  useEffect(() => {
    (async function () {
      await loadItemList();
      await refreshToken();
    })();
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
    loadCartData,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
