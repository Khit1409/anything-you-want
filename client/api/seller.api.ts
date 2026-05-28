import { ProductDetail, ProductPreviews, ApiResponse } from "@/interfaces";
import { axiosClient } from "@/lib/configs/axios.config";
import { isAxiosError } from "axios";

/**
 * Placeholder: gọi API lấy profile của seller.
 * Hiện chưa implement chi tiết, giữ nguyên cấu trúc try/catch để dễ bổ sung.
 */
export async function getSellerProfileService() {
  try {
  } catch (error) {
    console.error(error);
  }
}
/**
 * gọi api lấy danh sách sản phẩm thuộc về seller
 */
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
/**
 * @param id
 */
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
/**
 * Xóa sản phẩm theo id
 * @param id
 */
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
