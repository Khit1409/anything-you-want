import { ApiResponse } from "@/features/common/interfaces/common.interface";

import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";
import { RegisterSellerAccount } from "../interfaces/seller.interface";
import { GetProductTableQuery } from "@/features/product/interfaces/request.interface";
import {
  ProductDetail,
  ProductPreviews,
  ProductStatus,
} from "@/features/product/interfaces/read.interface";
import { CreateProductRequest } from "@/features/product/interfaces/create.interface";
import { CreateProductApiResponse } from "@/features/product/interfaces/response.interface";
import { EditProductRequest } from "@/features/product/interfaces/update.interface";
import { GetSellerOrderTableResponse } from "@/features/order/interfaces/response.interface";
import { GetOrderTableParams } from "@/features/order/interfaces/read.interface";

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
  const res = await axiosClient.get(`/sellers/products/${id}`);
  const api = res.data as ApiResponse;
  const { data } = api;
  return data as ProductDetail;
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
    const res = await axiosClient.post("/auth/register/seller", { ...data });
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

export async function createProductService(payload: CreateProductRequest) {
  const res = await axiosClient.post("/sellers/products", payload);
  const result = res.data as CreateProductApiResponse;
  return result;
}

export async function uploadProductImageService(images: {
  thumbnail: File;
  details: File[];
}) {
  try {
    const formData = new FormData();

    const { thumbnail, details } = images;
    formData.append("thumbnail", thumbnail);
    details.forEach((file) => formData.append("details", file));
    const res = await axiosClient.post("/products/upload-image", formData);
    const result = res.data as ApiResponse;
    const { message, success } = result;
    return {
      message,
      success,
      data: result.data as {
        thumbnail: { url: string; public_id: string };
        details: Array<{ url: string; public_id: string }>;
      },
    };
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success } = error.response?.data as ApiResponse;
      return { message, success };
    }
    throw error;
  }
}

export async function updateProductStatusService(
  id: string,
  status: ProductStatus,
) {
  const res = await axiosClient.patch<ApiResponse>(
    `/sellers/products/status/${id}`,
    {
      status,
    },
  );
  return res.data;
}

export async function updateProductService(
  productId: string,
  payload: EditProductRequest,
) {
  try {
    const res = await axiosClient.put(`/sellers/products/${productId}`, {
      ...payload,
    });
    const { message, success } = res.data as ApiResponse;
    return { message, success };
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success } = error.response?.data as ApiResponse;
      return { message, success };
    }
    return { message: "unknow error" + error, success: false };
  }
}

export async function getSellerOrderService(params: GetOrderTableParams) {
  const res = await axiosClient.get<GetSellerOrderTableResponse>(
    "/sellers/orders",
    { params },
  );
  const orders = res.data.data;
  return orders;
}
