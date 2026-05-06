import axios from "axios";
import { cookies } from "next/headers";

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
