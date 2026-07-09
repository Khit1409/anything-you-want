import {
  getProvinces,
  getWards,
} from "@/features/common/services/address.service";
import { getDetailForOrderService } from "@/features/product/services/product.service";
import { useQuery } from "@tanstack/react-query";

export default function useCreateOrderQuery(productId: string) {
  const {
    data = {
      wards: [],
      provinces: [],
      product: null,
    },
    isLoading,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const [wards, provinces, product] = await Promise.all([
        getWards(),
        getProvinces(),
        getDetailForOrderService(productId),
      ]);
      return { wards, provinces, product };
    },
  });

  const { wards, product, provinces } = data;

  return { wards, product, provinces, isLoading };
}
