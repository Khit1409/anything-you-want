import { axiosClient } from "@/lib/configs/axios.config";
import { Profile } from "../interfaces/user.interface";
import { ApiResponse } from "@/features/common/interfaces/common.interface";
import {
  CreateUserAddress,
  CreateUserInfo,
  CreateUserPhone,
} from "../interfaces/create.interface";
import { isAxiosError } from "axios";

export async function getInfoService() {
  const res = await axiosClient.get("/users/profile");
  const api = res.data as ApiResponse;
  const profile = api.data as Profile;
  return profile;
}

export async function createInfoService(body: CreateUserInfo) {
  try {
    const res = await axiosClient.post<ApiResponse>("/users/info", body);
    return res.data;
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

export async function createUserAddressService(body: CreateUserAddress[]) {
  try {
    const res = await axiosClient.post<ApiResponse>("/users/addresses", {
      ...body,
    });
    return res.data;
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

export async function createUserPhoneService(body: CreateUserPhone[]) {
  try {
    const res = await axiosClient.post<ApiResponse>("/users/phones", {
      ...body,
    });
    return res.data;
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
