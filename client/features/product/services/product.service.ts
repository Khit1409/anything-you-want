import { axiosClient } from "@/lib/configs/axios.config";

import { GetProductTableQuery } from "../interfaces/request.interface";
import {
  DeleteProductResponse,
  GetDetailForOrderResponse,
  GetProductPreviewResponse,
  ProductDetailResponse,
  ProductRelatedResponse,
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

  const res = await axiosClient.get<GetProductPreviewResponse>(`/products`, {
    params: {
      page,
      priceMax,
      priceMin,
      saleMax,
      saleMin,
      category,
    },
  });
  const { data } = res.data;
  return data;
}

export async function getProductDetailService(id: string) {
  const res = await axiosClient.get<ProductDetailResponse>(`/products/${id}`);
  const { data } = res.data;
  return data;
}

export async function getProductRelatedService(id: string) {
  const res = await axiosClient.get<ProductRelatedResponse>(
    `/products/${id}/related`,
  );
  const { data } = res.data;
  return data;
}

export async function deleteProductService(id: string) {
  const res = await axiosClient.delete<DeleteProductResponse>(
    `/sellers/products/${id}`,
  );
  return res.data;
}

export async function getProductBestSellerService(
  params: GetProductTableQuery,
) {
  const { price, sale, category, page } = params;
  const priceMax = price?.max;
  const priceMin = price?.min;
  const saleMax = sale?.max;
  const saleMin = sale?.min;
  const res = await axiosClient.get<GetProductPreviewResponse>(
    `/products/best-seller`,
    {
      params: {
        page,
        priceMax,
        priceMin,
        saleMax,
        saleMin,
        category,
      },
    },
  );
  const { data } = res.data;
  return data;
}

export async function getDetailForOrderService(productId: string) {
  const res = await axiosClient.get<GetDetailForOrderResponse>(
    `/products/order/${productId}`,
  );
  const { data } = res.data;
  return data;
}
