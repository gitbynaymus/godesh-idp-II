import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useEffect } from "react";

// ✅ Create axios instance (no need for withCredentials anymore)
export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
    );

    const responseInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        console.log("Error caught from axios interceptor -->", error.response);
        if (error.response?.status === 401 || error.response?.status === 403) {
          await logOut();
          localStorage.removeItem("token");
          navigate("/login");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
