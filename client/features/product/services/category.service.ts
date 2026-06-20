import { ApiResponse } from "@/features/common/interfaces/common.interface";
import {
  Categories,
} from "@/features/product/interfaces/category.interface";
import { axiosClient } from "@/lib/configs/axios.config";

/**
 * Gọi danh mục sản phẩm từ request url /categories
 * @returns
 */
export async function getCategoryService() {
  try {
    const res = await axiosClient.get("/categories");
    const { data } = res.data as ApiResponse;
    return data as Categories;
  } catch (error) {
    throw error;
  }
}
