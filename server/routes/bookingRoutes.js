import express from 'express'
import { changeBookinStatus, checkAvailabilityOfCar, createBoking, getOwnerBooking, getUseBookings } from "../controllers/bookingController.js";
import { protect } from "../middlewar/auth.js";

const  bookingRouter =  express.Router();

bookingRouter.post('/check-availability',checkAvailabilityOfCar)
bookingRouter.post('/create',protect,createBoking)
bookingRouter.get('/user',protect,getUseBookings)
bookingRouter.get('/owner',protect,getOwnerBooking)
bookingRouter.post('/change-status',protect,changeBookinStatus)

export default bookingRouter;
