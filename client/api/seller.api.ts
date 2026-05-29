import {
  ProductDetail,
  ProductPreviews,
  ApiResponse,
  RegisterSellerAccount,
} from "@/interfaces";
import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";

export async function getSellerProfileService() {
  try {
  } catch (error) {
    console.error(error);
  }
}

export async function getSellerProductListService() {
  try {
    const res = await axiosClient.get("/sellers/products");
    const api = res.data as ApiResponse & {
      data: ProductPreviews;
    };
    const { data } = api;
    return data as ProductPreviews;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getSellerProductDetailService(id: string) {
  try {
    const res = await axiosClient.get(`/sellers/products/${id}`);
    const api = res.data as ApiResponse & { data: ProductDetail };
    const { data } = api;
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error?.response?.data?.message as string);
      return null;
    }
    throw error;
  }
}

export async function deleteProductService(id: string) {
  try {
    const res = await axiosClient.delete(`/sellers/products/${id}`);
    return res.data as ApiResponse;
  } catch (error) {
    if (isAxiosError(error)) {
      const { response } = error;
      return response!.data as ApiResponse;
    }
    return {
      message: error as string,
      success: false,
      timestamp: new Date().toLocaleDateString("vi-VN"),
    };
  }
}

export async function registerSellerService(data: RegisterSellerAccount) {
  try {
    const res = await axiosClient.post("/sellers/register", { ...data });
    const { message, success } = res.data as ApiResponse;
    return { message, success };
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success } = error.response?.data as ApiResponse;
      return { message, success };
    }

    return { message: "Unknow error!", success: false };
  }
}
