
import { axiosClient } from "@/lib/configs/axios.config";
import { ApiResponse } from "../interfaces/common.interface";

export interface UploadImageResponse {
  url: string;
  public_id: string;
}

export async function uploadOneImage(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await axiosClient.post("/uploads", formData);
  const { data } = res.data as ApiResponse;
  return data as UploadImageResponse;
}

export async function uploadManyImage(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => formData.append("files", file));
  const res = await axiosClient.post("/uploads/many", formData);
  const { data } = res.data as ApiResponse;
  return data as UploadImageResponse[];
}
