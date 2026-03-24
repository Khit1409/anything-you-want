import {
  deleteCartService,
  getUserCartService,
  updateCartService,
} from "@/api/cart.api";
import { CartUpdateDataRequest } from "@/interfaces/request/cart.request";
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

  const [updateData, setUpdateData] = useState<CartUpdateDataRequest>();

  const onchangeVariantOptionChosen = ({
    id,
    key,
    e,
  }: {
    id: string;
    key: string;
    e: React.ChangeEvent<HTMLSelectElement>;
  }) => {
    setUpdateData((prev) => ({
      ...prev,
      id,
      variantOptionChosen: {
        ...prev?.variantOptionChosen,
        [key]: e.target.value,
      },
    }));
  };

  const onchangeQuantity = ({
    id,
    e,
  }: {
    id: string;
    e: React.ChangeEvent<HTMLInputElement>;
  }) => {
    setUpdateData((prev) => ({
      ...prev,
      id,
      quantity: Number(e.target.value),
    }));
  };

  const submitUpdate = async () => {
    if (!updateData) {
      return;
    }
    const result = await updateCartService(updateData);
    if (result) {
      if (!result.success) console.log(result.message);
      await refetch();
    }
  };

  const submitDelete = async (id: string) => {
    const result = await deleteCartService(id);
    if (result) {
      await refetch();
    }
  };
  return {
    carts: data,
    isLoading,
    error,
    submitUpdate,
    onchangeQuantity,
    onchangeVariantOptionChosen,
    updateData,
    submitDelete,
  };
}
