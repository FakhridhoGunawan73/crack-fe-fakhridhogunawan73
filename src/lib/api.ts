import axios from "axios";
import { clearAccessTokenCookie } from "./storage";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAccessTokenCookie();
      const path = window.location.pathname;
      if (!path.startsWith("/login") && !path.startsWith("/register")) {
        window.location.href = `/login?next=${encodeURIComponent(path)}`;
      }
    }
    return Promise.reject(error);
  },
);

export default api;