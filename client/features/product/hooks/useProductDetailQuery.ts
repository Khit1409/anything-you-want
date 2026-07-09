import {
  getProductDetailService,
  getProductRelatedService,
} from "../services/product.service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryProductDetail(id: string) {
  const { data = { product: null, relateds: [] }, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id) return { product: null, relateds: [] };
      const [product, relateds] = await Promise.all([
        getProductDetailService(id),
        getProductRelatedService(id),
      ]);
      return { product, relateds };
    },
    enabled: !!id,
  });

  return { ...data, isLoading };
}
