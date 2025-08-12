import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import axios from "axios";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta?.env?.VITE_CURRENCY;
  
  
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // Fetch user data
  const fetchUser = async () => {
  try {
    const { data } = await axiosInstance.get("/api/user/data");
    if (data.success) {
      setUser(data.user);
      setIsOwner(data.user.role === "owner");
    } else {
      toast.error("Your account cannot be authenticated."); 
      logout();
    }
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error("Your session expired. Please log in again.");
      logout();
    } else {
      toast.error("Something went wrong while fetching user.");
    }
  }
};

  // Fetch car listings
  const fetchCars = async () => {
    try {
      const { data } = await axiosInstance.get("/api/user/cars");
      data.success ? setCars(data.cars) : toast.error(data.message);
    } catch (error) {
      // Error already handled by interceptor
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setIsOwner(false);
    toast.success("You have been logged out");
    navigate("/");
  };

  // On first load: get token from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // When token is updated
  useEffect(() => {
    if (token) {
      fetchUser();
      fetchCars();
    }
  }, [token]);

  const value = {
    navigate,
    currency,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
     axios: axiosInstance
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
