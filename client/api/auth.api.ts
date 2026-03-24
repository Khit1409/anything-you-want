import { axiosClient } from "@/lib/configs/axios.config";
import { IAuthenticationResponse } from "@/interfaces/common/auth.interface";
import axios from "axios";

export interface LoginData {
  emailAddress: string;
  currentPassword: string;
  loginRole: "user" | "seller";
}
export interface LoginResponse {
  message: string;
  success: boolean;
  data?: { role: "user" | "seller" };
  timestamp: Date | string;
}
/**
 *
 * @param param0
 * @returns
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
 * @param role
 * @returns
 */
export async function authService(): Promise<IAuthenticationResponse> {
  try {
    const res = await axiosClient.get(`/auth/me`);
    const api: IAuthenticationResponse = res.data;
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
 *
 */
export interface LogoutResponse {
  message: string;
  success: boolean;
  timestamp: string | Date;
}
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
