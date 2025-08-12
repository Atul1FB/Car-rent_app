import express from "express";
import {
  getCars,
  getUserData,
  loginUser,
  registerUser,
} from "../controllers/userControllers.js";
import { protect } from "../middlewar/auth.js";

const userRouter = express.Router();

// Public Routes
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/cars", getCars);

// Protected Route (requires JWT auth)
userRouter.get("/data", protect, getUserData);

export default userRouter;
