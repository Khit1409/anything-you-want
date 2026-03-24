"use client";

import { getProductDetailService } from "@/api/product.api";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function useProductDetail() {
  const params: { id: string } | null = useParams();
  const id = params?.id;
  /***
   * component state
   */
  const [quantity, setQuantity] = useState<number>(1);
  const [classification,setClassification] = useState();

  /**
   * react query (api)
   */
  const { data, error, isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => {
      if (id) return getProductDetailService(id);
    },
    enabled: !!id,
  });
  const product = data?.product ?? null;
  const related = data?.related ?? [];
  /**
   * helper
   */
  const finalPrice = (price: number, sale: number) => {
    return price - price * (sale / 100);
  };

  const minusSale = (price: number, sale: number) => {
    const minusValue = price * (sale / 100);
    return minusValue;
  };

  const onchangeClassification = () => {};
  /**
   * result
   */
  return {
    product,
    related,
    error,
    isLoading,
    quantity,
    setQuantity,
    finalPrice,
    minusSale,
  };
}
