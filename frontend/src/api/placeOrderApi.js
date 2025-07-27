import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

//place order
const placeOrderApi = async (orderData, token) => {
  try {
    const res = await axios.post(`${baseUrl}/api/order/place`, orderData, {
      headers: {
        token: token,
      },
    });
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

//mark payment is done
const markPaymentDone = async (orderId) => {
  try {
    const res = await axios.put(`${baseUrl}/api/order/mark-paid/${orderId}`);
    return res.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

const fetchPaymentDetails = async (razorpay_order_id, razorpay_payment_id) => {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/order/payment-details/${razorpay_order_id}/${razorpay_payment_id}`
    );
    return res.data.data;
  } catch (err) {
    const errorMessage =
      err.response?.data?.message || "Something went wrong, Try again.";
    throw new Error(errorMessage);
  }
};

export { placeOrderApi, markPaymentDone, fetchPaymentDetails };
