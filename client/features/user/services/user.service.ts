import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";
import {
  Profile,
  RegisterUserAccountRequest,
} from "../interfaces/user.interface";
import { ApiResponse } from "@/features/common/interfaces/common.interface";

/**
 * Lấy api profile của người dùng.
 * @param 0
 * @returns
 */
export async function getInfoService(): Promise<Profile> {
  try {
    const res = await axiosClient.get("/users/profile");
    const api = res.data as ApiResponse;
    const profile = api.data as Profile;
    return profile;
  } catch (error) {
    console.log("user service error: ", error);
    throw error;
  }
}

/**
 * Register user account.
 * @param data
 * @returns
 */
export async function registerService(
  data: RegisterUserAccountRequest,
): Promise<ApiResponse> {
  try {
    const res = await axiosClient.post("/auth/register/user", { ...data });
    const result = res.data as ApiResponse;
    return result;
  } catch (error) {
    if (isAxiosError(error) && error.status == 400) {
      const { message, success, timestamp } = error.response
        ?.data as ApiResponse;
      return {
        message,
        success,
        timestamp,
      };
    }
    throw error;
  }
}
