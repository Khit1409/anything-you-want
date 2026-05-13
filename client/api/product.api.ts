import { axiosClient } from "@/lib/configs/axios.config";
import {
  ProductDetailApiResponse,
  ProductDetailDataApiResponse,
  ProductPreviewApiResponse,
  ProductPreviews,
  GetProductPreviewRequest,
  CreateProductRequest,
} from "@/interfaces/product.interface";
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
}: GetProductPreviewRequest): Promise<Array<ProductPreviews>> {
  try {
    const res = await axiosClient.get(`/products`, {
      params: {
        page: Number(page ?? 1),
      },
    });
    const api = res.data as ProductPreviewApiResponse;

    const products = api.data.products;
    return products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [];
    }
    return [];
  }
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
        related: [],
      };
    }
    return {
      product: null,
      related: [],
    };
  }
}
/**
 * Tạo sản phẩm bằng POST method /products
 * Trả về kết quả API Response type
 */
export async function createProductService(data: CreateProductRequest) {
  try {
    const res = await axiosClient.post("/products", data);
    const result = res.data as ApiResponse;
    return result;
  } catch (error) {
    if (isAxiosError(error)) {
      const { message, success, timestamp } = error.response
        ?.data as ApiResponse;
      return { message, success, timestamp };
    }
    throw error;
  }
}
