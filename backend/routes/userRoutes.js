import express from "express";

import {
  editUserDetails,
  passwordChange,
  getUser,
} from "../controllers/userController.js";

const router = express.Router();

//profile and update router
router.route("/profile").get(getUser).put(editUserDetails);

//user up router
router.route("/profile/passwordchange").put(passwordChange);

export default router;
