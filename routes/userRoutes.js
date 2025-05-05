import express from "express";
import {
  addUser,
  update_user,
  resetPassword,
  signupUser,
  loginUser,
  fetchUserByToken,
  deleteUserByToken
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signupUser);

router.post("/login", loginUser);

router.post("/user", fetchUserByToken);

router.post("/reset_password", resetPassword);

router.post("/update", update_user);

router.post("/add_user", addUser);

router.post("/delete", deleteUserByToken);
export default router;