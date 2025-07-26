import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  editUserDetails,
  passwordChange,
  getUser,
  getSavedAddresses,
  saveNewAddress,
  deleteSavedAddress,
  getUserOrders,
  editSaveAddress,
} from "../controllers/userController.js";

const router = express.Router();

//profile and update router
router
  .route("/profile")
  .post(authMiddleware, getUser)
  .put(authMiddleware, editUserDetails);

//user password change router
router.route("/profile/passwordchange").put(authMiddleware, passwordChange);

//get saved address router
router.route("/profile/addresses").post(authMiddleware, getSavedAddresses);

//save new address router
router
  .route("/profile/address")
  .post(authMiddleware, saveNewAddress)
  .put(authMiddleware, editSaveAddress);

//delete address router
router
  .route("/profile/address/delete")
  .post(authMiddleware, deleteSavedAddress);

//user orders router
router.route("/profile/myorders").post(authMiddleware, getUserOrders);

export default router;
