import axios from "axios";
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
  withCredentials: true,
});

API.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.error || "Something went wrong";
    if (error.response?.status === 401) {
      toast.error("Session expired. Please login again");
      window.location.href = "/";
    } else {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export const getApiErrorMessage = (error, fallbackMessage = "Something went wrong") => {
  const data = error?.response?.data;
  if (data?.error) return data.error;
  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors[0].msg || fallbackMessage;
  }
  return fallbackMessage;
};

export default API;
