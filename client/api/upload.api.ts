import { ApiResponse } from "@/interfaces";
import { axiosClient } from "@/lib/configs/axios.config";

export interface UploadImageResponse {
  url: string;
  public_id: string;
}

export async function uploadOneImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post("/uploads", formData);
  const { data } = res.data as ApiResponse & { data: UploadImageResponse };
  return data;
}
