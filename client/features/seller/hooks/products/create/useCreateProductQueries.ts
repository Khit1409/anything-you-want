import {
  getProvinces,
  Provinces,
} from "@/features/common/services/address.service";
import { Categories } from "@/features/product/interfaces/read.interface";
import { getCategoryService } from "@/features/product/services/category.service";
import { useQuery } from "@tanstack/react-query";

export default function useCreateProductQueries() {
  const defaultData = { categories: [], provinces: [] };
  const { data = defaultData, isLoading } = useQuery<{
    categories: Categories;
    provinces: Provinces;
  }>({
    queryKey: ["createApi"],
    queryFn: async () => {
      const [categories, provinces] = await Promise.all([
        getCategoryService(),
        getProvinces(),
      ]);
      return { categories, provinces };
    },
  });

  return { ...data, isLoading };
}
