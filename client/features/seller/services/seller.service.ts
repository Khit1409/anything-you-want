import { ApiResponse } from "@/features/common/interfaces/common.interface";
import {
  GetProductTableQuery,
  ProductDetail,
  ProductPreviews,
} from "@/features/product/interfaces/product.interface";
import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";
import { RegisterSellerAccount } from "../interfaces/seller.interface";

export async function getSellerProfileService() {
  try {
  } catch (error) {
    console.error(error);
  }
}

export async function getSellerProductListService(query: GetProductTableQuery) {
  try {
    const { page, category, price, sale } = query;
    const priceMax = price?.max;
    const priceMin = price?.min;
    const saleMax = sale?.max;
    const saleMin = sale?.min;
    const res = await axiosClient.get("/sellers/products", {
      params: {
        page,
        category,
        priceMax,
        priceMin,
        saleMax,
        saleMin,
      },
    });
    const api = res.data;
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
    const api = res.data as ApiResponse;
    const { data } = api;
    return data as ProductDetail;
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
