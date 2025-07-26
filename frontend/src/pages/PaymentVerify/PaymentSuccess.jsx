import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import {
  fetchPaymentDetails,
  markPaymentDone,
} from "../../api/placeOrderApi.js";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentData, setPaymentData] = useState(null);
  const [countdown, setCountdown] = useState(5); // countdown state

  const razorpay_order_id = searchParams.get("order_id");
  const razorpay_payment_id = searchParams.get("payment_id");

  useEffect(() => {
    (async () => {
      if (razorpay_order_id && razorpay_payment_id) {
        const res = await fetchPaymentDetails(
          razorpay_order_id,
          razorpay_payment_id
        );
        setPaymentData(res);
        await markPaymentDone(res.order.notes.orderId);
      }
    })();
  }, [razorpay_order_id, razorpay_payment_id]);

  // Handle countdown and redirect
  useEffect(() => {
    if (!paymentData) return;

    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/myorders");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }, 0); // Decouple from render

    return () => clearTimeout(timeout);
  }, [paymentData, navigate]);

  if (!paymentData) {
    return <p className="text-center my-10">Loading payment details...</p>;
  }

  const { order, paymentDetails } = paymentData;

  return (
    <div className="md:max-w-10/12 mx-auto md:my-10 px-3 flex justify-center items-center">
      <div className="box shadow-md w-72 px-5 flex flex-col">
        <div className="header flex flex-col items-center mb-8">
          <img
            src={assets.payment_success}
            alt="Success"
            className="w-28 text-center mb-3"
          />
          <h2 className="text-center text-green-500 text-lg">
            Payment Successful
          </h2>
          <p className="text-sm text-gray-300 text-center">
            Thank you for your payment. Your transaction was successful!
          </p>
        </div>

        <div className="payment-details flex flex-col gap-y-1 text-sm">
          <div className="type flex justify-between">
            <p className=" text-gray-600">Transaction Id</p>
            <p className="text-gray-900 break-words w-36">
              {paymentDetails.acquirer_data.upi_transaction_id}
            </p>
          </div>
          <div className="type flex justify-between text-gray-600">
            <p className=" text-gray-600">Payment type</p>
            <p className="text-gray-900">
              {paymentDetails.method.toUpperCase()}
            </p>
          </div>
          <div className="customer-details flex flex-col gap-y-1">
            <div className="phone flex justify-between text-gray-600">
              <p className=" text-gray-600">Mobile</p>
              <p className="text-gray-900">{paymentDetails.contact}</p>
            </div>
            <div className="email flex justify-between text-gray-600">
              <p className=" text-gray-600">Email</p>
              <p className="text-gray-900">{paymentDetails.email}</p>
            </div>
          </div>
        </div>

        <div className="amount flex justify-between my-4 font-semibold text-gray-800">
          <p>Amount Paid</p>
          <p>₹ {(paymentDetails.amount / 100).toFixed(2)}</p>
        </div>
        <div className="my-4 text-center text-sm text-gray-500">
          Redirecting to home in{" "}
          <span className="font-semibold text-gray-800">{countdown}</span>{" "}
          second{countdown !== 1 && "s"}...
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
