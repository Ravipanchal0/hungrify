import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  editMenuItem,
  removeMenuItem,
} from "../controllers/menuItemController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/menulist").get(getAllMenuItems);
router.route("/add").post(upload.single("image"), addMenuItem);
router.route("/remove/:id").delete(removeMenuItem);
router.route("/edit/:id").put(editMenuItem);

export default router;
