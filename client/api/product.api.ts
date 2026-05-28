import { axiosClient } from "@/lib/configs/axios.config";
import {
  ProductDetailApiResponse,
  ProductDetailDataApiResponse,
  ProductPreviews,
  GetProductPreviewRequest,
  CreateProductRequest,
  ProductVariants,
  UpdateProductVariants,
} from "@/interfaces";
import axios, { isAxiosError } from "axios";
import { ApiResponse } from "@/interfaces/common.interface";
/**
 * Lấy danh sách sản phẩm (preview) với phân trang.
 * Gọi `GET /products` với query param `page`.
 * @param param0: GetProductPreviewRequest (chứa `page`)
 * @returns mảng `ProductPreviews`
 */
export async function getProductService({
  page,
}: GetProductPreviewRequest): Promise<ProductPreviews> {
  const res = await axiosClient.get(`/products`, {
    params: {
      page: Number(page ?? 1),
    },
  });
  const api = res.data;
  const products = api.data as ProductPreviews;
  return products;
}
/**
 * Lấy chi tiết sản phẩm theo `id` (GET /products/:id).
 * Trả về object `ProductDetailDataApiResponse` chứa `product` và `related`.
 */
export async function getProductDetailService(
  id: string
): Promise<ProductDetailDataApiResponse> {
  try {
    const res = await axiosClient.get(`/products/${id}`);
    const api = res.data as ProductDetailApiResponse;
    const data = api.data;
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        product: null,
        relateds: [],
      };
    }
    return {
      product: null,
      relateds: [],
    };
  }
}
/**
 * Tạo sản phẩm bằng POST method /products
 * Trả về kết quả API Response type
 */
export async function createProductService(payload: CreateProductRequest) {
  try {
    const res = await axiosClient.post("/sellers/products", payload);
    const result = res.data as ApiResponse & {
      data: { id: string };
    };
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success, timestamp } = error.response
        ?.data as ApiResponse;
      return { message, success, timestamp, data: null };
    }
    throw error;
  }
}
/**
 * Upload thumbnail & img details
 * @param images
 * @returns
 */

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

export async function getVariantForEditService(productId: string) {
  try {
    const res = await axiosClient.get(
      `/sellers/products/${productId}/variants`
    );
    const { data } = res.data as ApiResponse;
    return data as ProductVariants;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function updateVariantService(
  productId: string,
  variants: UpdateProductVariants
) {
  try {
    const res = await axiosClient.put(
      `/sellers/products/${productId}/variants`,
      { variants }
    );
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
