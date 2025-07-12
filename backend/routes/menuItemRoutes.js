import express from "express";
import {
  addMenuItem,
  getAllMenuItems,
  editMenuItem,
  removeMenuItem,
  getMenuItemById,
  itemAvailability,
} from "../controllers/menuItemController.js";
import { upload } from "../middlewares/multerMiddleware.js";

const router = express.Router();

router.route("/menulist").get(getAllMenuItems);
router.route("/menulist/:id").get(getMenuItemById);
router.route("/add").post(upload.single("image"), addMenuItem);
router.route("/delete/:id").delete(removeMenuItem);
router.route("/edit/:id").put(editMenuItem);
router.route("/edit/:id/availability").patch(itemAvailability);

export default router;
