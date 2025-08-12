import mongoose from "mongoose";
import User from "../models/User.js"
const {ObjectId}  = mongoose.Schema.Types

const bookingSchema = new mongoose.Schema({

    car:{type:ObjectId,ref:"Car",required:true},
    user:{type:ObjectId,ref:"User",required:true},
    owner:{type:ObjectId,ref:"User",required:true},
    pikupDate:{type:Date,required:true},
    retrunDate:{type:Date,required:true},
    status:{type:String,eum:["pending","confirmed","cancelled"],default:"peding"},
    peice:{type:Number,required:true}

},{timestamps:true});

const booking = mongoose.model("Booking",bookingSchema);

export default booking;