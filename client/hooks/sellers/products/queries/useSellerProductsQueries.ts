import { getProductListService } from "@/api/seller.api";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useSellerProductPreviews() {
  const { data = [] } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      return await getProductListService();
    },
  });

  const products = data;

  const [selectedIdOpenModal, setSelectedIdOpenModal] = useState<string>();

  return { products, setSelectedIdOpenModal, selectedIdOpenModal };
}
