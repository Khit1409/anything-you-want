import { axiosClient } from "@/lib/configs/axios.config";

import { ApiResponse } from "@/features/common/interfaces/common.interface";
import { GetProductTableQuery } from "../interfaces/request.interface";
import { ProductPreviews } from "../interfaces/read.interface";
import {
  DeleteProductResponse,
  ProductDetailDataApiResponse,
} from "../interfaces/response.interface";

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

export async function deleteProductService(id: string) {
  const res = await axiosClient.delete(`/sellers/products/${id}`);
  const { data, message, success } = res.data as DeleteProductResponse;
  return { success, message, data };
}

export async function getProductBestSellerService(
  params: GetProductTableQuery,
) {
  const { price, sale, category, page } = params;
  const priceMax = price?.max;
  const priceMin = price?.min;
  const saleMax = sale?.max;
  const saleMin = sale?.min;
  const res = await axiosClient.get(`/products/best-seller`, {
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
