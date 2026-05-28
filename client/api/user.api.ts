import { Profile, RegisterUserAccountRequest, ApiResponse } from "@/interfaces";
import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";

/**
 * Lấy api profile của người dùng.
 * @param 0
 * @returns
 */
export async function getInfoService(): Promise<Profile> {
  try {
    const res = await axiosClient.get("/users/profile");
    const { data } = res.data as ApiResponse;
    return data as Profile;
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
export async function userRegister(
  data: RegisterUserAccountRequest
): Promise<ApiResponse> {
  try {
    const res = await axiosClient.post("/users/register", { ...data });
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
