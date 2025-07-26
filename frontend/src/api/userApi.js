import axios from "axios";

const saveNewAddress = async (address, token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/address`,
      address,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const editSaveAddress = async (token, address) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/address`,
      address,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const getSavedAddresses = async (token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/addresses`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const deleteSavedAddresses = async (token, id) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/address/delete`,
      { id },
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const getMyorders = async (token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/myorders`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const getUserProfile = async (token) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/`,
      {},
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const passwordChange = async (token, data) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/passwordchange`,
      data,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const updateProfile = async (token, data) => {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/user/profile/`,
      data,
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const cancelOrder = async (token, orderId) => {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/order/cancel`,
      { orderId },
      {
        headers: {
          token: token,
        },
      }
    );
    return res.data.data;
  } catch (err) {
    throw new Error(
      err.response?.data?.message || "Failed to cancel the order"
    );
  }
};

export {
  saveNewAddress,
  editSaveAddress,
  getSavedAddresses,
  getMyorders,
  getUserProfile,
  updateProfile,
  passwordChange,
  deleteSavedAddresses,
  cancelOrder,
};
