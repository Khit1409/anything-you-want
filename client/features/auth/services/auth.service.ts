import { axiosClient } from "@/lib/configs/axios.config";
import { AuthenticationResponse } from "@/features/auth/interfaces/auth.interface";
import axios, { isAxiosError } from "axios";
import {
  ApiResponse,
  Role,
} from "@/features/common/interfaces/common.interface";
import { CreateUserSecurity } from "@/features/user/interfaces/create.interface";

export interface LoginRequest {
  emailAddress: string;
  currentPassword: string;
  loginRole: Role;
}
export type LoginDataResponse = { role: Role };

export interface LoginResponse {
  message: string;
  success: boolean;
  data?: LoginDataResponse;
}

export async function loginService({
  currentPassword,
  emailAddress,
  loginRole,
}: LoginRequest) {
  try {
    const res = await axiosClient.post("/auth/login", {
      currentPassword,
      emailAddress,
      loginRole,
    });
    const { data, success, message } = res.data as LoginResponse;
    return { data, success, message };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.response?.data as LoginResponse;
    }
    return {
      message: "Server error!",
      success: false,
    };
  }
}

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
        timestamp: new Date().toLocaleDateString("vi-VN"),
      };
    }
    return {
      message: "SERVER_ERROR",
      success: false,
      timestamp: new Date().toLocaleDateString("vi-VN"),
    };
  }
}

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

export async function registerUserService(body: CreateUserSecurity) {
  try {
    const res = await axiosClient.post<ApiResponse>("/auth/register/user", {
      ...body,
    });
    const result = res.data;
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      return error.response?.data as ApiResponse;
    }
    return {
      message: "Lỗi không xác định!",
      success: false,
      timestamp: Date.now().toLocaleString("vi-VN"),
    };
  }
}
