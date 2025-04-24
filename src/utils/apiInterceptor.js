import axios from "axios";
const baseURL = "https://polymer-nodejs.vercel.app/api";

const axiosInstance = axios.create({
  baseURL: baseURL,
});
const a = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MDYyYTRkYTkxYjc4NTczNjhiZDk0YiIsImVtYWlsIjoiam9obi5kb2VAZXhhbXBsZS5jb20iLCJuYW1lIjoiSm9obiBEb2UiLCJyb2xlIjoic3VwZXJhZG1pbiIsImlhdCI6MTc0NTUwMjA3MiwiZXhwIjoxNzQ1Njc0ODcyLCJpc3MiOiJjb2RlLW94In0.s8CxupRiBuZeyQskxlBOLDEe1OqXA0-ksPuJqhSzol4"
const token = localStorage.getItem("token") || null;


axiosInstance.interceptors.request.use(
  function (config) {
    if (token) {
      config.headers["Authorization"] = `Bearer ${a}`;
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
