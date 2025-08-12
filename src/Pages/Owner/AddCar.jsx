import React, { useState } from 'react';
import Tittlen from '../../Components/Owner/Tittlen';
import { assets } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddCar = () => {
  const { axios, currency } = useAppContext();

  const [image, setImage] = useState();
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: '',
    priceperDay: '',
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: '',
    location: '',
    description: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const onsubmitHnadler = async (e) => {
    e.preventDefault();
    if (isLoading) return null;
    setIsLoading(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('image', image);
      formData.append('carData', JSON.stringify(car));

      const { data } = await axios.post('/api/owner/add-car', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'content-type': 'multipart/form-data',
        },
      });

      if (data.success) {
        toast.success(data.message);
        setImage(null);
        setCar({
          brand: '',
          model: '',
          year: 0,
          priceperDay: '',
          category: '',
          transmission: '',
          fuel_type: '',
          seating_capacity: '',
          location: '',
          description: '',
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-10 md:px-10 flex-1 bg-white rounded-xl shadow-sm">
      <Tittlen
        title="Add New Car"
        subTitle="Fill in details to list a car for booking, including price, availability, and car specifications."
      />

      <form
        onSubmit={onsubmitHnadler}
        className="flex flex-col gap-6 text-gray-700 text-sm mt-8 max-w-3xl"
      >
        {/* Image Upload */}
        <div className="flex items-center gap-4 w-full">
          <label htmlFor="car-image" className="cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_icon}
              alt="Upload"
              className="h-20 w-20 object-cover rounded-xl border border-gray-300 shadow-sm hover:shadow-md"
            />
            <input
              type="file"
              id="car-image"
              accept="image/*"
              hidden
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
          <p className="text-sm text-gray-500">
            Upload a picture of your car (JPG/PNG)
          </p>
        </div>

        {/* Brand & Model */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Brand</label>
            <input
              type="text"
              placeholder="e.g. BMW, Mercedes, Audi"
              required
              className="px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
              value={car.brand}
              onChange={(e) => setCar({ ...car, brand: e.target.value })}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Model</label>
            <input
              type="text"
              placeholder="e.g. X5, E-Class, M4"
              required
              className="px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
              value={car.model}
              onChange={(e) => setCar({ ...car, model: e.target.value })}
            />
          </div>
        </div>

        {/* Year, Price, Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Year</label>
            <input
              type="number"
              placeholder="2025"
              min="0"
              required
              className="no-arrows  px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
              value={car.year}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || Number(value) >= 0) {
                  setCar({ ...car, year: value });
                }
              }}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">
              Daily Price ({currency})
            </label>
            <input
              type="number"
              placeholder="100"
              min="0"
              required
              className="px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
              value={car.priceperDay}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || Number(value) >= 0) {
                  setCar({ ...car, priceperDay: value });
                }
              }}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Category</label>
            <select
              onChange={(e) => setCar({ ...car, category: e.target.value })}
              value={car.category}
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
            >
              <option value="">Select Category</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Van">Van</option>
            </select>
          </div>
        </div>

        {/* Transmission, Fuel Type, Seating Capacity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Transmission</label>
            <select
              onChange={(e) => setCar({ ...car, transmission: e.target.value })}
              value={car.transmission}
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
            >
              <option value="">Select Transmission</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
              <option value="Semi-Automatic">Semi-Automatic</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Fuel Type</label>
            <select
              onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
              value={car.fuel_type}
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
            >
              <option value="">Select Fuel Type</option>
              <option value="gas">Gas</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Seating Capacity</label>
            <input
              type="number"
              placeholder="4"
              min="0"
              required
              className="px-4 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
              value={car.seating_capacity}
              onChange={(e) => {
                const value = e.target.value;
                if (value === '' || Number(value) >= 0) {
                  setCar({ ...car, seating_capacity: value });
                }
              }}
            />
          </div>
        </div>

        {/* Location & Description */}
        <div className="flex flex-col w-full">
          <label className="font-medium text-gray-600">Location</label>
          <select
            onChange={(e) => setCar({ ...car, location: e.target.value })}
            value={car.location}
            className="px-3 py-2 mt-2 mb-4 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary text-base"
          >
            <option value="">Select Location</option>
            <option value="new york">New York</option>
            <option value="los angeles">Los Angeles</option>
            <option value="houston">Houston</option>
            <option value="chicago">Chicago</option>
          </select>

          {/* Description */}
          <div className="flex flex-col w-full">
            <label className="font-medium text-gray-600">Description</label>
            <textarea
              rows={5}
              placeholder="A luxury SUV with a spacious interior and a powerful engine"
              required
              className="px-3 py-2 mt-2 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-primary"
              value={car.description}
              onChange={(e) =>
                setCar({ ...car, description: e.target.value })
              }
            ></textarea>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2.5 mt-6 bg-primary text-white rounded-md font-medium w-max cursor-pointer"
          >
            <img src={assets.tick_icon} alt="" />
            {isLoading ? 'listing...' : 'List Your Car'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
