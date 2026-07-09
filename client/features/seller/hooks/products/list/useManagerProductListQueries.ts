import {
  Categories,
  ProductPreviews,
} from "@/features/product/interfaces/read.interface";
import { GetProductTableQuery } from "@/features/product/interfaces/request.interface";
import { getCategoryService } from "@/features/product/services/category.service";
import { getSellerProductListService } from "@/features/seller/services/seller.service";
import { useQuery } from "@tanstack/react-query";

interface QueryResult {
  products: ProductPreviews;
  categories: Categories;
}

export default function useManagerProductListQueries(
  filter: GetProductTableQuery,
) {
  const defaultData = { products: [], categories: [] };
  const {
    data = defaultData,
    isLoading,
    isError,
    refetch,
  } = useQuery<QueryResult>({
    queryKey: ["products", filter],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        getSellerProductListService(filter),
        getCategoryService(),
      ]);
      return { products, categories };
    },
  });
  return { ...data, isLoading, refetch, isError };
}
