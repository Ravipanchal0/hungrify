import React from "react";
import { assets } from "../../assets/assets";

const PaymentFailed = () => {
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
      </div>
    </div>
  );
};

export default PaymentFailed;
