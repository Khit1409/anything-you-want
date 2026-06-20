import { CartRequest } from "@/features/cart/interfaces/cart.interface";
import { addToCartService } from "@/features/cart/services/cart.api";
import useLoading from "@/features/common/hooks/useLoading";
import { openModal } from "@/features/common/redux/common.slice";
import { ModalState } from "@/features/common/redux/common.state";
import { useAppDispatch } from "@/shared/redux/selector";

export default function useAddCart() {
  const dispatch = useAppDispatch();

  const { handleLoading } = useLoading();

  async function addToCart(data: CartRequest) {
    const { productId, quantity, optionIds } = data;
    if (!productId)
      return dispatch(
        openModal({
          message: "Không nhận được id sản phẩm!",
          state: ModalState.WARNING,
        }),
      );
    if (quantity < 1) {
      return dispatch(
        openModal({
          message: "Số lượng tối thiểu 1",
          state: ModalState.WARNING,
        }),
      );
    }
    if (optionIds.length == 0) {
      return dispatch(
        openModal({
          message: "Không tìm thấy biến thể!",
          state: ModalState.WARNING,
        }),
      );
    }
    const res = await handleLoading(addToCartService, data);
    const { success, message } = res;
    if (!success) {
      return dispatch(openModal({ message, state: ModalState.ERROR }));
    }
    return dispatch(openModal({ message, state: ModalState.SUCCESS }));
  }

  return { addToCart };
}
