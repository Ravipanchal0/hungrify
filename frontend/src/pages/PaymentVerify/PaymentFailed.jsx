import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // countdown state

  // Handle countdown and redirect
  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigate("/");
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="md:max-w-10/12 mx-auto md:my-10 px-3 flex justify-center items-center">
      <div className="box shadow-md w-72 px-3 flex flex-col">
        <div className="header flex flex-col items-center py-5">
          <img src={assets.payment_failed} alt="" className=" text-center" />
          <h2 className="text-center text-red-500 text-lg ">
            Your Payment Failed
          </h2>
          <p className="text-sm text-gray-500">Try again</p>
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

export default PaymentFailed;
