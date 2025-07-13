import express from "express";

import {
  login,
  register,
  getUserByToken,
} from "../controllers/authController.js";

const router = express.Router();

//login router
router.route("/login").post(login);

//register router
router.route("/register").post(register);

//token router
router.route("/token").post(getUserByToken);

export default router;
