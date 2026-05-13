import axios from "axios";
import { cookies } from "next/headers";

/**
 * Tạo một instance axios cho môi trường server-side (Next.js server components / route handlers).
 * - Lấy cookie từ `next/headers` và gửi trong header `Cookie` để backend nhận được session/token.
 * - Sử dụng khi cần gọi API từ server-side rendering hoặc server components.
 */
export async function axiosServer() {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api",
    timeout: 15000,
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
    },
  });
}
