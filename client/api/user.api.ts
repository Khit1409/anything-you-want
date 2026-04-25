import { ApiResponse } from "@/interfaces/common/response";
import { Profile } from "@/interfaces/response/user.response";
import { axiosClient } from "@/lib/configs/axios.config";

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
