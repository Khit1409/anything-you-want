import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import { GetProductTableQuery } from "@/features/product/interfaces/request.interface";
import { deleteProductService } from "@/features/product/services/product.service";
import React, { useState } from "react";

export default function useManagerProductListHandle() {
  const [filter, setFilter] = useState<GetProductTableQuery>({ page: 1 });
  const { handleLoading } = useLoading();
  const appModal = useAppModal();
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
  async function deleteHandle(id: string) {
    const res = await handleLoading(deleteProductService, id);
    const { message, success } = res;
    return appModal.open({ message, success });
  }

  return { onchangeFilter, filter, setFilter, deleteHandle };
}
