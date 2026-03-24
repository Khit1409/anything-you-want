import axios from "axios";

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  withCredentials: true,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});
