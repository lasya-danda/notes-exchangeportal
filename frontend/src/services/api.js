
import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
});

export const getApiErrorMessage = (error, fallbackMessage) => {
  const data = error?.response?.data;

  if (data?.error) {
    return data.error;
  }

  if (Array.isArray(data?.errors) && data.errors.length > 0) {
    return data.errors[0].msg || fallbackMessage;
  }

  return fallbackMessage;
};

export default API;
