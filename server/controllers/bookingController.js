import Booking from "../models/Booking.js"
import Car from "../models/car.js";

// function to check availability of car for a given date
const checkAvailability = async (car, pickupDate, returnDate) => {
  const bookings = await Booking.find({
    car,
    pickupDate: { $lte: returnDate }, // lte - less than or equal
    returnDate: { $gte: pickupDate }, // gte - greater than or equal
  });
  return bookings.length === 0;
}

// API to check availability of cars for the given date location
export const checkAvailabilityOfCar = async (req, res) => {
  try {
    const { location, pickupDate, returnDate } = req.body;
    // fetch all available cars for the given location
    const cars = await Car.find({ location, isAvailable: true });
    const availableCarsPromis = cars.map(async (car) => {
      const isAvailable = await checkAvailability(car._id, pickupDate, returnDate)
      return { ...car._doc, isAvailable: isAvailable }
    })
    let availableCars = await Promise.all(availableCarsPromis)
    availableCars = availableCars.filter(car => car.isAvailable === true)
    res.json({ success: true, availableCars })
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

// API to create booking
export const createBoking = async (req, res) => {
  try {
    const { _id } = req.user;
    const { car, pickupDate, returnDate } = req.body;

    const isAvailable = await checkAvailability(car, pickupDate, returnDate)
    if (!isAvailable) {
      return res.json({ success: false, message: "car is not available" })
    }
    const carData = await Car.findById(car)

    // calculate price based on pickupDate and returnDate
    const picked = new Date(pickupDate);
    const returned = new Date(returnDate);
    const noOfDate = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
    const price = carData.pricePerDay * noOfDate;

    await Booking.create({ car, owner: carData.owner, user: _id, pickupDate, returnDate, price })
    res.json({ success: true, message: "Booking created" })

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message })
  }
}

// API to list User Bookings
export const getUseBookings = async (req, res) => {
  try {
    const { _id } = req.user;
  } catch (error) {
    console.log(error.message)
    res.json({ success: false, message: error.message })
  }
}

// API to get owner booking
export const getOwnerBooking = async (req, res) => {
  try {
    if (req.user.role !== "owner") {
      return res.json({ success: false, message: "Unauthorized" })
    }
    const bookings = await Booking.find({ owner: req.user._id }).populate('car user')
    .select("-user.password")
      .sort({ createdAt: -1 })
      res.json({success:false, message:error.message})
  } catch (error) {
    console.log(error.message)
    res.json({success:false,message: error.message})

  }
}
// API to change the booking status
export const changeBookinStatus = async(req,res)=>{
    try {
        const {_id} = req.user
        const {bookingId,status}= req.body
        const booking = await Booking.findById(bookingId)
        if(booking.owner.toString() !== _id.toString()){
       return res.json({success:false,message:"Unauthorized"})   
     
        }
        booking.status = status
        await booking.save();
        res.json({success:true,message:'status updated'})
    } catch (error) {
        
    }
}