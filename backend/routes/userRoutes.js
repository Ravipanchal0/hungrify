import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";

import {
  editUserDetails,
  passwordChange,
  getUser,
  getSavedAddresses,
  saveNewAddress,
  deleteSavedAddress,
} from "../controllers/userController.js";

const router = express.Router();

//profile and update router
router
  .route("/profile")
  .post(authMiddleware, getUser)
  .put(authMiddleware, editUserDetails);

//user password change router
router.route("/profile/passwordchange").put(authMiddleware, passwordChange);

//user address router
router.route("/profile/addresses").post(authMiddleware, getSavedAddresses);

//user address router
router.route("/profile/address").post(authMiddleware, saveNewAddress);

//user address router
router
  .route("/profile/address/delete")
  .post(authMiddleware, deleteSavedAddress);

export default router;
