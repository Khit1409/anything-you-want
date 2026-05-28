import { getCategoryService } from "@/api/category.api";
import { useQuery } from "@tanstack/react-query";

export default function useCreateProductQueries() {
  const { data = { categories: [] } } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const [categories] = await Promise.all([getCategoryService()]); // có thể gọi thêm 1 số api khác kết hợp
      return { categories };
    },
  });

  const { categories } = data;
  return {
    categories,
  };
}
