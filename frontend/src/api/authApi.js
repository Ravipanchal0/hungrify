import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

const createAccount = async (data) => {
  try {
    const response = await axios.post(`${baseUrl}/register`, data);
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
    const response = await axios.post(`${baseUrl}/login`, data);
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
    const response = await axios.post(`${baseUrl}/token`, { token });
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
