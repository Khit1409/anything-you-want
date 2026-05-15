import axios from "axios";

/**
 * Axios client dùng cho các request từ client-side.
 * - `baseURL` lấy từ `NEXT_PUBLIC_API_URL` hoặc fallback về localhost
 * - `withCredentials: true` để gửi cookie cùng request
 * - `timeout` và header mặc định được cấu hình sẵn
 */
export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
  withCredentials: true,
  timeout: 15000,
});
