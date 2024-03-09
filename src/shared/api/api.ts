import axios from "axios";
import md5 from "md5";

const result = new Date().toISOString().split("T")[0].split("-").join("");
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API,
  headers: {
    "X-Auth": md5(`${process.env.REACT_APP_PASSWORD}${result}`),
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default axiosInstance;
