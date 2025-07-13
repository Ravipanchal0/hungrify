import express from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

//add to cart route
router.route("/add").post(authMiddleware, addToCart);

//remove from cart route
router.route("/remove").post(authMiddleware, removeFromCart);

//get all item of cart route
router.route("/items").post(authMiddleware, getCart);

export default router;
