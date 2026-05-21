import { redirect } from "next/navigation";
import { useState } from "react";

export default function useProductsActions() {
  const [openActionModal, setOpenActionModal] = useState<string>();

  async function redirectToDetail() {
    if (!openActionModal) return;
    sessionStorage.setItem("product_seller_selected", openActionModal);
    redirect("/seller/products/detail");
  }

  return {
    setOpenActionModal,
    openActionModal,
    redirectToDetail,
  };
}
