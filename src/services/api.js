import axios from "axios";
import { isTokenExpired, clearSession } from "../utils/auth";

const BASE_URL =
  (import.meta.env.VITE_API_URL || "https://backend-spfa.onrender.com") + "/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// ── Cola para peticiones que llegaron mientras se renovaba el token ──────────
let isRefreshing = false;
let pendingQueue = [];

function processQueue(error, newToken = null) {
  pendingQueue.forEach(({ resolve, reject }) =>
    error ? reject(error) : resolve(newToken)
  );
  pendingQueue = [];
}

// ── REQUEST: adjunta el token Bearer si existe y no ha expirado ──────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && !isTokenExpired(token)) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── RESPONSE: intenta renovar el token ante un 401 ───────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    // Solo actúa ante 401 y evita bucles en la propia llamada de refresh
    if (error.response?.status !== 401 || original._retry) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      clearSession();
      window.location.href = "/login-gtg";
      return Promise.reject(error);
    }

    // Si ya hay un refresh en curso, encola esta petición
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject });
      }).then((newToken) => {
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      });
    }

    original._retry = true;
    isRefreshing = true;

    try {
      // Llamada de refresh usando axios base (no la instancia `api`) para
      // evitar que el interceptor de respuesta se llame a sí mismo
      const { data } = await axios.post(
        `${BASE_URL}/auth/refresh`,
        { refreshToken }
      );

      const newToken = data.token;
      localStorage.setItem("token", newToken);
      if (data.refreshToken) {
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      processQueue(null, newToken);
      original.headers.Authorization = `Bearer ${newToken}`;
      return api(original);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearSession();
      window.location.href = "/login-gtg";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;
