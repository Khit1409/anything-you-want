import { axiosClient } from "@/lib/configs/axios.config";
import { GetProductPreviewRequest } from "@/interfaces/request/product.request";
import {
  ProductDetailApiResponse,
  ProductDetailDataApiResponse,
  ProductPreviewApiResponse,
  ProductPreviews,
} from "@/interfaces/response/product.response";
import axios from "axios";

/**
 *
 * @param param0
 * @returns
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
    console.log("Product api response: ", products[0]);
    return products;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return [];
    }
    return [];
  }
}
/**
 *
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
