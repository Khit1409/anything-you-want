import { getCategoryService } from "@/api/category.api";
import { getSellerProductDetailService } from "@/api/seller.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

export default function useProductDetailQueries() {
  const params: { id: string } | null = useParams();
  const id = params?.id;

  const { data = { product: null, categories: [] } } = useQuery({
    queryKey: ["productId", id],
    queryFn: async () => {
      if (!id)
        return {
          product: null,
          categories: [],
        };
      const [product, categories] = await Promise.all([
        getSellerProductDetailService(id),
        getCategoryService(),
      ]);
      return { product, categories };
    },
    enabled: !!id,
  });

  const { product, categories } = data;

  return {
    product,
    categories,
  };
}
