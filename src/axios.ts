import axiosInstance from "axios";

const axios = axiosInstance.create({
  baseURL: "http://localhost:8080",
});

export default axios;