"use client";

import { addToCartFeature } from "@/features/cart.feature";
import { ProductDetail } from "@/interfaces";
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

  /**
   * Thực hiện chức năng thêm giỏ hàng.
   * @params 0
   */
  const addToCartHandle = async () => {
    console.log(variantId);
    await addToCartFeature({
      variantId,
      dispatch,
      isLoggedIn,
      product,
      quantity,
      router,
    });
  };

  /**
   * result
   */
  return {
    addToCartHandle,
  };
}
