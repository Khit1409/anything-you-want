import {
  deleteCartService,
  getUserCartService,
} from "../services/cart.service";
import { useQuery } from "@tanstack/react-query";

import useLoading from "@/features/common/hooks/useLoading";
import { useAppDispatch, useAppSelector } from "@/shared/redux/selector";
import { openModal } from "@/features/common/redux/common.slice";
import { ModalState } from "@/features/common/redux/common.state";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useCartList() {
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [],
    queryFn: async () => {
      return await getUserCartService();
    },
  });
  const dispatch = useAppDispatch();
  const { handleLoading } = useLoading();
  const authStatus = useAppSelector((state) => state.auth);
  const router = useRouter();
  useEffect(() => {
    const { initialized, isLoading, isLoggedIn } = authStatus;
    if (!isLoading && initialized && !isLoggedIn) {
      console.log("Chưa đăng nhập");
      router.replace("login");
    }
  }, [authStatus, router]);

  async function deleteCart(id: string) {
    const res = await handleLoading(deleteCartService, id);
    const { message, success } = res;

    if (refetch) {
      await refetch();
    }

    return dispatch(
      openModal({
        message: message ?? "Lỗi không xác định!",
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      }),
    );
  }

  function redirectToUpdate(productId: string) {
    router.replace(`/products/${productId}#add-cart-button`);
  }

  return { carts: data, isLoading, deleteCart, redirectToUpdate };
}
