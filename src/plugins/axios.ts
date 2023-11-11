import axios from "axios";

const apiHost = import.meta.env.VITE_API_HOST + "back/";
if (!apiHost) {
  console.error("Provide an API_HOST env variable");
}

const axiosInstance = axios.create({
  baseURL: apiHost,
  responseType: "json",
  withCredentials: true,
});

export default axiosInstance;
