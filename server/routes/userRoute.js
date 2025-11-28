import express from "express";
import {
  adminlogincontroller,
  loginController,
  signupController,
  userchartController,
  usershowController,
} from "../controllers/userController.js";

import {
  FoodCategoryController,
  FoodMenuController,
  showCategoryController,
  showMenuController,
  deleteCetgoryController,
  deletemenuController,
  updateCategoryController,
  updateMenuController,
} from "../controllers/FoodController.js";
import {
  workesController,
  showWorkerController,
  deletestaffController,
  updatestaffController,
} from "../controllers/workersController.js";
import multer from "multer";
import { validateData } from "../middlewares/validatorMiddleware.js";
import { loginschema, signupschema } from "../validators/userValidator.js";
import {
  paymentcontroller,
  paymentverification,
} from "../controllers/paymentcontroller.js";
import {
  handleOrderData,
  orderchartController,
  showOrderController,
  updateOrder,
} from "../controllers/orderController.js";
import { handleUserOrderData } from "../controllers/handleUserOrderData.js";
import { contactController } from "../controllers/contactController.js";

export const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/signup").post(validateData(signupschema), signupController);
router.route("/login").post(validateData(loginschema), loginController);
router.route("/adminlogin").post(adminlogincontroller);

router
  .route("/AddCategory")
  .post(upload.single("image"), FoodCategoryController);
router.route("/Addmenu").post(upload.single("image"), FoodMenuController);
router.route("/Addstaff").post(workesController);
router.route("/showcategory").get(showCategoryController);
router.route("/showmenu").get(showMenuController);
router.route("/showWorker").get(showWorkerController);
router.route("/payment").post(paymentcontroller);
router.route("/paymentverification").post(paymentverification);
router.route("/myorders").post(handleOrderData);
router.route("/userorderdata").post(handleUserOrderData);
router.route("/deletecategory/:id").delete(deleteCetgoryController);
router.route("/deletemenu/:id").delete(deletemenuController);
router.route("/deletestaff/:id").delete(deletestaffController);
router.route("/updateStaff/:id").put(updatestaffController);
router.route("/updatecategory/:id").put(updateCategoryController);
router.route("/updatemenu/:id").put(updateMenuController);
router.route("/showuser").get(usershowController);
router.route("/showorder").get(showOrderController);
router.route("/contact").post(contactController);
router.route("/user-registrations").get(userchartController);
router.route("/user-orderchart").get(orderchartController);
router.route("/updateorder").put(updateOrder);
