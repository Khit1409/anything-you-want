import { getCategoryService } from "@/api/category.api";
import { getProvinces } from "@/features";
import { useQuery } from "@tanstack/react-query";

export default function useCreateProductQueries() {
  const { data = { categories: [], provinces: [] } } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const [categories, provinces] = await Promise.all([
        getCategoryService(),
        getProvinces(),
      ]); // có thể gọi thêm 1 số api khác kết hợp
      return { categories, provinces };
    },
  });

  const { categories, provinces } = data;
  return {
    provinces,
    categories,
  };
}
