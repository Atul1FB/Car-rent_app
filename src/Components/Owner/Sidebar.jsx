import React, { useState } from 'react';
import { assets, ownerMenuLinks } from '../../assets/assets';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const { user, api, fetchUser } = useAppContext();
  const location = useLocation();
  const token = localStorage.getItem("token");

  //  Load from localStorage first
  const [userImage, setUserImage] = useState(() => {
    return localStorage.getItem("userImage") || user?.image || "https://unsplash.com/...";
  });

  const [image, setImage] = useState(null);

  const updateImage = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);

      const { data } = await api.post('/api/owner/update-image', formData)
                 
      console.log(data);

      if (data.success) {
        toast.success(data.message);

        //  Save to localStorage and state
        if (data.updatedImageUrl) {
          localStorage.setItem("userImage", data.updatedImageUrl);
          setUserImage(data.updatedImageUrl);
        }

        fetchUser();
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='relative min-h-screen md:flex flex-col items-center pt-8 max-w-3 md:max-w-60 w-full border-r border-borderColor text-sm'>
      {/* Avatar upload */}
      <div className='group relative'>
        <label htmlFor='image' className='cursor-pointer'>
          <img
            src={image ? URL.createObjectURL(image) : userImage}
            alt="User avatar"
            className='w-30 h-30 md:w-28 md:h-28 rounded-full mx-auto'
          />
          <input
            type="file"
            id="image"
            accept='image/*'
            hidden
            onChange={e => setImage(e.target.files[0])}
          />
          <div className='absolute inset-0 bg-black/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
            <img src={assets.edit_icon} alt="Edit icon" />
          </div>
        </label>
      </div>

      {/* Save button only when new image selected */}
      {image && (
        <button
          className='absolute top-0 right-0 flex p-2 gap-1 bg-primary-400/15 text-primary cursor-pointer'
          onClick={updateImage}
        >
          Save <img src={assets.check_icon} width={13} alt="Save icon" />
        </button>
      )}

      {/* Name */}
      <p className='mt-3 text-base max-md:hidden'>{user?.name}</p>

      {/* Sidebar Menu */}
      <div className='w-full'>
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname ? "bg-primary text-white" : "text-gray-600"
            }`}
          >
            <img src={link.path === location.pathname ? link.coloredIcon : link.icon} alt="Menu icon" />
            <span className='max-md:hidden'>{link.name}</span>
            {link.path === location.pathname && (
              <div className='bg-primary w-1.5 h-8 rounded-r absolute right-0'></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
