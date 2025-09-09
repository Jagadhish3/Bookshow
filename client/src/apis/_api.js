// utils/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://bookshow-vqgk.onrender.com",
  // baseURL: "http://localhost:3001/api",
  headers: {
    "Content-Type": "application/json"
  },
  withCredentials: true
});

export default instance;