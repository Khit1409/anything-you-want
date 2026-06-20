import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getProductService } from "../services/product.service";
import { GetProductTableQuery } from "../interfaces/product.interface";
import { getCategoryService } from "../services/category.service";

export default function useProductList() {
  const [filter, setFilter] = useState<GetProductTableQuery>({
    page: 1,
  });
  const {
    data = { products: [], categories: [] },
    refetch,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        getProductService(filter),
        getCategoryService(),
      ]);
      return { products, categories };
    },
  });

  const { products, categories } = data;

  const onChangeFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value, selectedOptions } = e.target;
    if (name === "price" || name == "sale") {
      const option = selectedOptions[0];
      if (!option.dataset.max || !option.dataset.min)
        return setFilter((prev) => ({ page: prev.page }));
      const max = Number(option.dataset.max);
      const min = Number(option.dataset.min);
      setFilter((prev) => ({ ...prev, [name]: { max, min } }));
      return;
    }
    setFilter((prev) => ({ ...prev, category: value }));
  };

  return {
    products,
    refetch,
    isError,
    isLoading,
    filter,
    setFilter,
    onChangeFilter,
    categories,
  };
}
