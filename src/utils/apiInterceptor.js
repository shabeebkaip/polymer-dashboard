import axios from "axios";
// const baseURL = "https://polymer-nodejs.vercel.app/api";
// const baseURL = "http://localhost:7000/api";
const baseURL = "https://polymer-backend.code-ox.com/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});

const token = localStorage.getItem("token") || null;

axiosInstance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
