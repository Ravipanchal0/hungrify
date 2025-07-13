import express from "express";

import { login, register, logout } from "../controllers/authController.js";

const router = express.Router();

//login router
router.route("/login").post(login);

//register router
router.route("/register").post(register);

//logout router
router.route("/logout").post(logout);

export default router;
