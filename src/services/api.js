import axios from "axios";

const api = axios.create({
  // Llamamos a la variable de tu .env, y si falla, usamos el enlace directo de respaldo
  baseURL: import.meta.env.VITE_API_URL || "https://backend-m3nj.onrender.com",
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;