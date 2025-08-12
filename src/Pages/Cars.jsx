import React, { useEffect, useState } from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import CarCard from '../Components/CarCard';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const Cars = () => {
  const [searchParams] = useSearchParams();
  const pickupLocation = searchParams.get("pickupLocation");
  const pickupDate = searchParams.get("pickupDate");
  const retrunDate = searchParams.get("retrunDate ");
  const { cars, axios } = useAppContext();

  const [input, setInput] = useState("");
  const [filteredCars, setFilterdCars] = useState([]);
  const isSearchData = pickupLocation && pickupDate && retrunDate;

  const applyFilter = async () => {
    if (input === "") {
      setFilterdCars(cars);
      return;
    }

    const filtered = cars.slice().filter((car) =>
      car.brand.toLowerCase().includes(input.toLowerCase()) ||
      car.model.toLowerCase().includes(input.toLowerCase()) ||
      car.categroy.toLowerCase().includes(input.toLowerCase()) ||
      car.transmission.toLowerCase().includes(input.toLowerCase())
    );
    setFilterdCars(filtered);
  };

  const searchCarAvailability = async () => {
    const { data } = await axios.post('/api/booking/check-availability', {
      location: pickupLocation,
      pickupDate,
      retrunDate,
    });

    if (data.success) {
      setFilterdCars(data.availableCars);
      if (data.availableCars.length === 0) {
        toast("No cars available");
      }
    }
  };

  useEffect(() => {
    isSearchData && searchCarAvailability();
  }, []);

  useEffect(() => {
    cars.length > 0 && !isSearchData && applyFilter();
  }, [input, cars]);

  return (
    <div>
      <motion.div
        className='text-green-500 flex flex-col items-center py-20 bg-light max-md:px-4'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
      >
        <Title
          title="Available Cars"
          subTitle="Browse our selection of premium vehicles available for your next adventure"
        />

        <motion.div
          className='flex items-center bg-white px-4 mt-6 max-w-[560px] w-full h-12 rounded-full shadow-md'
          variants={fadeInUp}
        >
          <img src={assets.search_icon} alt="Search Icon" className='w-4.5 h-4.5 mr-2' />
          <input
            type="text"
            placeholder='Search by make, model or features'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className='w-full outline-none text-semibod'
          />
          <img src={assets.filter_icon} alt="Filter Icon" className='w-4.5 h-4.5 ml-2' />
        </motion.div>
      </motion.div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <motion.p
          className='text-gray-500 xl:px-20 max-w-7xl mx-auto'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Showing {filteredCars.length} Cars
        </motion.p>

        <motion.div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl m-auto'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredCars.map((car, index) => (
            <motion.div key={index} variants={itemVariants}>
              <CarCard car={car} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Cars;
