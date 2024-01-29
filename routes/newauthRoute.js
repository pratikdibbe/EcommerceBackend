import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  
} from "../controllers/newauthController.js";

import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";

const router = express.Router();

// REGISTER || POST
// router.post("", registerController);
router.post("/register", registerController);

//LOGIN
router.post("/login", loginController);


//TEST
router.get("/test", requireSignIn, isAdmin, testController);


//FORGOT PASSWORD
router.post("/forgotpassword", forgotPasswordController);


// PROTECTED ROUTES for user AUTH
router.get("/userauth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});


// PROTECTED ROUTE FOR ADMIN PANEL
router.get("/adminauth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});



//update profile
router.put("/profile", requireSignIn, updateProfileController);



export default router;
