import { Categories, ApiResponse } from "@/interfaces";
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
