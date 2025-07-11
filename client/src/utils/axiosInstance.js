import axios from "axios";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: apiUrl,
  withCredentials: true, // important for cookies
});

export default axiosInstance;
