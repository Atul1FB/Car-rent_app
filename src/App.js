import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import CarDetails from './Pages/CarDetails';
import Cars from './Pages/Cars';
import MyBooking from './Pages/MyBooking';
import Dashboard from './Pages/Owner/Dashboard';
import AddCar from './Pages/Owner/AddCar';
import ManageBooking from './Pages/Owner/ManageBooking';
import ManageCars from './Pages/Owner/ManageCars';
import Layout from './Pages/Owner/Layout';
import Login from './Components/Login'; 
import { Toaster } from 'react-hot-toast';
import './index.css'; // Tailwind CSS
import { useAppContext } from './context/AppContext';

function App() {
  const {showLogin} = useAppContext()
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <>
    <Toaster/>
    
      {!isOwnerPath && <Navbar/>}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/car-details/:id' element={<CarDetails />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/my-bookings' element={<MyBooking />} />

        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-car' element={<ManageCars />} />
          <Route path='manage-booking' element={<ManageBooking />} />
        </Route>
      </Routes>

      {!isOwnerPath && <Footer />}
        {showLogin &&<Login/>}
    </>
  );
}

export default App;
