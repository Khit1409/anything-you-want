import { deleteProductService } from "@/api/seller.api";
import { STORAGE_KEY } from "@/constants/storage";
import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { redirect } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function useSellerProductHandles() {
  const dispatch = useDispatch<AppDispatch>();
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
    // console.log("product id", id);
    setOpenWarningModal(true);
  };

  async function handleDelete() {
    const productId = sessionStorage.getItem(STORAGE_KEY.SELLER_DELETE_PRODUCT);
    if (!productId) {
      return dispatch(
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

    return dispatch(
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
