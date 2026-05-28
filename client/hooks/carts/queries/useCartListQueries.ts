import { getUserCartService } from "@/api";
import { useQuery } from "@tanstack/react-query";

export default function useCartListQueries() {
  const {
    data = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: async () => {
      return await getUserCartService();
    },
  });

  const carts = data ?? [];
  return { carts, error, isLoading, refetch };
}
