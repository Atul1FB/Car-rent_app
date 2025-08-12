import React, { useEffect } from 'react';
import NavbarOwner from '../../Components/Owner/NavbarOwner';
import Sidebar from '../../Components/Owner/Sidebar';
import { Outlet } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const Layout = () => {

  const {isOwner,navigate}  = useAppContext()

  useEffect(()=>{
    if(!isOwner) {
      navigate('/')
    }
  },[isOwner])
  return (
    <div className='flex min-h-screen'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className='flex-1 flex flex-col'>
        {/* Navbar at top */}
        <NavbarOwner />

        {/* Page content below navbar */}
        <div className='p-4 md:p-6 flex-1 bg-gray-50'>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
