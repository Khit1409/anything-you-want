import { getProductService } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface QueryProps {
  page: number;
}
export default function useProductListQueries({ page }: QueryProps) {
  const { data = [], isLoading } = useQuery({
    queryKey: ["products", page],
    queryFn: async () => {
      console.log(page);
      return await getProductService({ page });
    },
  });

  const products = data;
  return { products, isLoading };
}
