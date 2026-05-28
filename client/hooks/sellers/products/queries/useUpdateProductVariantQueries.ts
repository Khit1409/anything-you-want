import { getVariantForEditService } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface QueryProps {
  productId: string;
}

export default function useUpdateProductVariantQueries({
  productId,
}: QueryProps) {
  const { data = [] } = useQuery({
    queryKey: ["variants", productId],
    queryFn: async () => {
      return await getVariantForEditService(productId);
    },

    enabled: !!productId,
  });

  const variants = data;
  return { variants };
}
