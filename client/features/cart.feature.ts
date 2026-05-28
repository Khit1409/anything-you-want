import { addToCartService } from "@/api/cart.api";
import { ProductDetail } from "@/interfaces";
import { openModal, startLoadingAnimation } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface AddToCartHandleParam {
  isLoggedIn: boolean;
  product: ProductDetail | null;
  router: AppRouterInstance;
  variantId?: string;
  dispatch: AppDispatch;
  quantity: number;
}

/**
 * add to cart service
 * 1 - Quantity mặc định đã là 1 và đã config không thể nhập số nhỏ hơn 1 nên không cần check.
 * 2 - Tự động chuyển hướng nếu users đang ở trạng thái logout.
 * 3 - Không thể thực hiện khi người dùng chưa chọn phân loại sản phẩm.
 * 4 - Không thể thực hiện khi số lượng phân loại đã chọn khác số lượng phâm loại sản phẩm.
 * @params 0
 */
export const addToCartFeature = async (params: AddToCartHandleParam) => {
  const { isLoggedIn, product, router, variantId, dispatch, quantity } = params;

  if (!isLoggedIn) {
    return router.replace("/login");
  }
  if (!product) {
    console.log("Product is not define!");
    return;
  }
  if (!variantId) {
    return dispatch(
      openModal({
        message: "Không tìm thấy biến thể của sản phẩm",
        state: ModalState.WARNING,
      })
    );
  }

  dispatch(startLoadingAnimation());

  const res = await addToCartService({
    variantId,
    productId: product.id,
    quantity: quantity <= 0 ? 1 : quantity,
  });

  if (res) {
    dispatch(startLoadingAnimation());
    return res.success
      ? dispatch(
          openModal({
            message: "Thêm giỏ hàng thành công",
            state: ModalState.SUCCESS,
          })
        )
      : dispatch(
          openModal({
            message: res.message,
            state: ModalState.ERROR,
          })
        );
  }
};
