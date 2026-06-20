import { axiosClient } from "@/lib/configs/axios.config";
import {
  ProductDetailDataApiResponse,
  ProductPreviews,
  CreateProductRequest,
  CreateProductApiResponse,
  EditProductRequest,
  GetProductTableQuery,
} from "../interfaces/product.interface";
import { isAxiosError } from "axios";
import { ApiResponse } from "@/features/common/interfaces/common.interface";

export async function getProductService({
  page,
  category,
  price,
  sale,
}: GetProductTableQuery) {
  const priceMax = price?.max;
  const priceMin = price?.min;
  const saleMax = sale?.max;
  const saleMin = sale?.min;

  const res = await axiosClient.get(`/products`, {
    params: {
      page,
      priceMax,
      priceMin,
      saleMax,
      saleMin,
      category,
    },
  });
  const api = res.data;
  const products = api.data as ProductPreviews;
  return products;
}

export async function getProductDetailService(id: string) {
  const res = await axiosClient.get<ApiResponse>(`/products/${id}`);
  const { data } = res.data;
  return data as ProductDetailDataApiResponse;
}

export async function createProductService(
  payload: CreateProductRequest,
): Promise<CreateProductApiResponse> {
  try {
    const res = await axiosClient.post("/sellers/products", payload);
    const result = res.data as CreateProductApiResponse;
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success, timestamp } = error.response
        ?.data as ApiResponse;
      return { message, success, timestamp, data: { id: undefined } };
    }
    throw error;
  }
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
