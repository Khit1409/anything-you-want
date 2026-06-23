import { useQuery } from "@tanstack/react-query";
import { getSellerProductListService } from "../services/seller.service";
import { useState } from "react";
import { GetProductTableQuery } from "@/features/product/interfaces/product.interface";
import { getCategoryService } from "@/features/product/services/category.service";

export default function useManagerProductList() {
  console.log("HOOK CREATED");
  const [filter, setFilter] = useState<GetProductTableQuery>({ page: 1 });

  const {
    data = { products: [], categories: [] },
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", filter],
    queryFn: async () => {
      const [products, categories] = await Promise.all([
        getSellerProductListService(filter),
        getCategoryService(),
      ]);
      return { products, categories };
    },
  });

  const onchangeFilter = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFilter((prev) => {
      if (name === "price" || name === "sale") {
        const { selectedOptions } = e.target as HTMLSelectElement;
        const max = selectedOptions[0].dataset.max;
        const min = selectedOptions[0].dataset.min;
        return { ...prev, [name]: { max, min } };
      }
      return { ...prev, [name]: name === "page" ? Number(value) : value };
    });
  };

  const { products, categories } = data;

  const isEmpty = !isLoading && products.length == 0;
  const isShow = !isLoading && products.length !== 0;
  console.log("hook", products);

  return {
    products,
    categories,
    isLoading,
    isError,
    onchangeFilter,
    refetch,
    filter,
    setFilter,
    isEmpty,
    isShow,
  };
}
