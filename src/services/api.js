import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-m3nj.onrender.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;