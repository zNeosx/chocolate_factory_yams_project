import axios from "axios";

export const Axios = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    mode: "cors",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
