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

export { saveNewAddress, getSavedAddresses };
