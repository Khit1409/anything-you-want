import { axiosClient } from "@/lib/configs/axios.config";
import { AuthenticationResponse } from "@/interfaces/auth.interface";
import axios from "axios";

/**
 * API liên quan tới xác thực (login / logout / kiểm tra token)
 * Các hàm ở đây gọi `axiosClient` tới các endpoint tương ứng trên server.
 */

/**
 * Dữ liệu gửi lên khi đăng nhập.
 */
export interface LoginData {
  emailAddress: string;
  currentPassword: string;
  loginRole: "user" | "seller";
}
/**
 * Kiểu dữ liệu phản hồi khi gọi API login.
 */
export interface LoginResponse {
  message: string;
  success: boolean;
  data?: { role: "user" | "seller" };
  timestamp: Date | string;
}

/**
 * Gọi API `POST /auth/login` để xác thực user.
 * Trả về `LoginResponse` chứa thông tin kết quả và role nếu thành công.
 */
export async function loginService({
  currentPassword,
  emailAddress,
  loginRole,
}: LoginData): Promise<LoginResponse> {
  try {
    const res = await axiosClient.post("/auth/login", {
      currentPassword,
      emailAddress,
      loginRole,
    });
    const data: LoginResponse = res.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    return {
      message: "Server error!",
      success: false,
      timestamp: new Date().toLocaleDateString("vi-VN"),
    };
  }
}
/**
 * Kiểm tra token hiện tại, gọi `GET /auth/me` để lấy thông tin xác thực.
 * Trả về `AuthenticationResponse` từ server (bao gồm `data` nếu token hợp lệ).
 */
export async function authService(): Promise<AuthenticationResponse> {
  try {
    const res = await axiosClient.get(`/auth/me`);
    const api: AuthenticationResponse = res.data;
    return api;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message,
        success: false,
        data: null,
        timestamp: new Date().toLocaleDateString("vi-VN"),
      };
    }
    return {
      message: "SERVER_ERROR",
      success: false,
      data: null,
      timestamp: new Date().toLocaleDateString("vi-VN"),
    };
  }
}
/**
 * Phản hồi từ API khi logout.
 */
export interface LogoutResponse {
  message: string;
  success: boolean;
  timestamp: string | Date;
}
/**
 * Gọi API `POST /auth/logout` để đăng xuất.
 * Nếu server trả về success=false sẽ ném lỗi, hàm luôn trả về `LogoutResponse`.
 */
export async function logoutService(): Promise<LogoutResponse> {
  try {
    const res = await axiosClient.post("/auth/logout");
    const api: LogoutResponse = res.data;
    if (!api.success) throw new Error(api.message);
    return api;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data.message,
        success: false,
        timestamp: new Date().toLocaleDateString(),
      };
    }
    if (error instanceof Error)
      return {
        message: error.message,
        success: false,
        timestamp: new Date().toLocaleDateString(),
      };
    return {
      message: "Unknow error",
      success: false,
      timestamp: new Date().toLocaleDateString(),
    };
  }
}
