import express from "express";
import {
  addCar,
  changeRoleToOwner,
  deleteCar,
  getOwnerCars,
  toggleCarAvailability,
  getDashBoardData,
  updateUserImage
} from "../controllers/ownercontroller.js";
import { protect } from "../middlewar/auth.js";
import upload from "../middlewar/multer.js";

// Define it here before using it
const ownerRouter = express.Router();

// Optional test route
ownerRouter.post('/test', (req, res) => {
  console.log(" /test route hit!");
  res.json({ success: true });
});

ownerRouter.post('/change-role', protect, changeRoleToOwner);
ownerRouter.post('/add-car', protect, upload.single("image"), addCar);
ownerRouter.get('/cars', protect, getOwnerCars);
ownerRouter.post('/toggle-car', protect, toggleCarAvailability);
ownerRouter.post('/delete-car', protect, deleteCar);
ownerRouter.get('/dashboard', protect, getDashBoardData);
ownerRouter.post('/update-image', protect, upload.single('image'), updateUserImage);

export default ownerRouter;
