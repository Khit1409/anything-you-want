import { getUserCartService } from "@/api/cart.api";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function useCartList() {
  const {
    data = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["carts"],
    queryFn: () => {
      return getUserCartService();
    },
  });

  return {
    carts: data,
    isLoading,
    error,
  };
}
