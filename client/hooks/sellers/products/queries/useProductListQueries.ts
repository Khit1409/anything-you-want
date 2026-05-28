import { getSellerProductListService } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useProductListQueries() {
  const { data = [], refetch } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getSellerProductListService();
    },
  });

  const products = data;

  const [selectedIdOpenModal, setSelectedIdOpenModal] = useState<string>();

  return { products, setSelectedIdOpenModal, selectedIdOpenModal, refetch };
}
