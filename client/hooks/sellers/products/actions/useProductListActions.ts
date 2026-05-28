import { deleteProductService } from "@/api";
import { STORAGE_KEY } from "@/constants/storage";
import { AppDispatch, ModalState, openModal } from "@/redux";

import { redirect } from "next/navigation";
import { useState } from "react";

interface ActionProps {
  dispatch?: AppDispatch;
}

export default function useProductListActions({ dispatch }: ActionProps) {
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  const redirectToDetailPage = (id: string) => {
    sessionStorage.setItem(STORAGE_KEY.SELLER_PRODUCT_DETAIL, id);
    const path = `/seller/products/detail/${id}`;
    redirect(path);
  };

  const onCloseWarningModal = () => {
    setOpenWarningModal(false);
  };

  const onOpenWarningModal = (id: string) => {
    sessionStorage.setItem(STORAGE_KEY.SELLER_DELETE_PRODUCT, id);
    setOpenWarningModal(true);
  };

  async function handleDelete() {
    const productId = sessionStorage.getItem(STORAGE_KEY.SELLER_DELETE_PRODUCT);
    if (!productId) {
      return dispatch!(
        openModal({
          message: "ID sản phẩm cần xóa lỗi xác lập!",
          state: ModalState.WARNING,
        })
      );
    }

    const { message, success } = await deleteProductService(productId);

    if (success) {
      sessionStorage.removeItem(STORAGE_KEY.SELLER_DELETE_PRODUCT);
    }

    return dispatch!(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  }

  return {
    onCloseWarningModal,
    onOpenWarningModal,
    handleDelete,
    openWarningModal,
    redirectToDetailPage,
  };
}
