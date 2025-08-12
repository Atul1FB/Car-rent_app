import React, { useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import Title from "../Components/Title";
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' }
  }
};

const MyBooking = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/user');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <motion.div
      className='px-6 md:px-16 lg:px-32 2xl:px-48 mt-16 text-sm max-w-7xl text-green-500'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={fadeInUp}>
        <Title
          title="My Bookings"
          subTitle="View and manage your all car bookings"
          align="center"
        />
      </motion.div>

      <motion.div variants={containerVariants}>
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            variants={cardVariants}
            className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12 bg-white shadow-sm'
          >
            {/* Car Info */}
            <div className='md:col-span-1'>
              <motion.div
                className='rounded-md overflow-hidden mb-3'
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <img src={booking.car.image} alt="" className='w-full h-auto aspect-video object-cover' />
              </motion.div>
              <p className='text-lg font-medium mt-2 text-yellow-800'>
                {booking.car.brand} {booking.car.model}
              </p>
              <p className='text-gray-800 font-semibold'>
                {booking.car.year} • {booking.car.category} • {booking.car.location}
              </p>
            </div>

            {/* Booking Info */}
            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-dark rounded text-white font-semibold'>
                  Booking {index + 1}
                </p>
                <p className={`px-3 py-1 text-sm rounded-full ${booking.status === "confirmed"
                  ? "bg-green-400/15 text-green-600"
                  : "bg-red-400/15 text-red-600"}`}>
                  {booking.status}
                </p>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-700'>Rental Period</p>
                  <p className='text-gray-700'>{booking.pickupDate.split("T")[0]} To {booking.returnDate.split("T")[0]}</p>
                </div>
              </div>

              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon_colored} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-700'>Pickup-location</p>
                  <p className='text-gray-700'>{booking.car.location}</p>
                </div>
              </div>
            </div>

            {/* Price Info */}
            <div className='md:col-span-1 flex flex-col justify-between gap-6'>
              <div className='text-sm text-gray-500 text-right'>
                <p>Total Price</p>
                <h1 className='text-2xl font-semibold text-primary'>
                  {currency}{booking.price}
                </h1>
                <p>Booked on {booking.createdAt.split("T")[0]}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default MyBooking;
