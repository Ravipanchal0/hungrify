import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const createAccount = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/register`, data);
    if (response.data.success) {
      return response.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

const loginUser = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/login`, data);
    if (response.data.success) {
      return response.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

const getUserByToken = async (token) => {
  try {
    const response = await axios.post(`${baseUrl}/api/auth/token`, { token });
    if (response.data.success) {
      return response.data;
    }
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong. Try again.";
    throw new Error(errorMessage);
  }
};

export { createAccount, loginUser, getUserByToken };
