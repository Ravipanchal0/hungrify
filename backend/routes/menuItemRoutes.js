import express from "express";
import { addMenuItem } from "../controllers/menuItemController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/add").post(upload.single("image"), addMenuItem);

export default router;
