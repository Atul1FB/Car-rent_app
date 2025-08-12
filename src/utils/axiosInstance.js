import axios from "axios";

// Create instance
const axiosInstance = axios.create({
  baseURL: import.meta?.env?.VITE_BASE_URL || "http://localhost:5000",
  withCredentials: false,
});

// Request interceptor: attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: Response interceptor (e.g. logout on 401)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - possibly invalid/expired token.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
