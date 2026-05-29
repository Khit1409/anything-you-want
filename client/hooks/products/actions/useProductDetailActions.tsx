"use client";

import { addToCartService } from "@/api";
import { checkingCartData } from "@/features";
import useLoading from "@/hooks/common/useLoading";
import { ProductDetail } from "@/interfaces";
import { ModalState, openModal } from "@/redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

interface ActionProps {
  product: ProductDetail | null;
  quantity: number;
  variantId?: string;
}

export default function useProductDetailActions({
  product,
  quantity,
  variantId,
}: ActionProps) {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { handleLoading } = useLoading({ dispatch });

  /**
   * Thực hiện chức năng thêm giỏ hàng.
   * @params 0
   */
  const addToCartHandle = async () => {

    const checked = checkingCartData({
      variantId,
      dispatch,
      isLoggedIn,
      product,
      quantity,
      router,
    });

    if (!checked) {
      return;
    }

    const res = await handleLoading(addToCartService, {
      productId: checked.productId,
      quantity: checked.quantity,
      variantId: checked.variantId,
    });

    const { message, success } = res;

    return dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  };

  /**
   * result
   */
  return {
    addToCartHandle,
  };
}
