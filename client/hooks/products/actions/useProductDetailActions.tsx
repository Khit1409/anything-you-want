"use client";

import { addToCartFeature } from "@/features/cart.feature";
import { AppDispatch, RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useProductDetailHelpers, useProductDetailQueries } from "..";

export default function useProductDetailActions() {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // Fetch product data and related products
  const { product, related, isLoading, error } = useProductDetailQueries();
  /***
   * component state
   */
  // Local UI helpers for product detail (quantity, classification selection, price helpers)
  const {
    classificationSelected,
    finalPrice,
    getMaxQuantity,
    minusSale,
    onchangeClassification,
    quantity,
    setQuantity,
  } = useProductDetailHelpers(product);
  /**
   * Thực hiện chức năng thêm giỏ hàng.
   * @params 0
   */
  const addToCartHandle = async () => {
    await addToCartFeature({
      classificationSelected,
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
    product,
    related,
    error,
    isLoading,
    quantity,
    setQuantity,
    finalPrice,
    minusSale,
    onchangeClassification,
    classificationSelected,
    addToCartHandle,
    getMaxQuantity,
  };
}
