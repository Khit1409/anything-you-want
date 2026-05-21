import { getProductDetailService } from "@/api/product.api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

/**
 * Query hook to fetch product detail and related products.
 * - Reads `id` from router params
 * - Uses React Query to fetch and cache the data
 */
export default function useProductDetailQueries() {
  const params: { id: string } | null = useParams();
  const id = params?.id;
  const {
    data = { product: null, related: [] },
    error,
    isLoading,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => {
      if (id) return getProductDetailService(id);
    },
    enabled: !!id,
  });

  const { product, related } = data;

  return { product, related, error, isLoading };
}
