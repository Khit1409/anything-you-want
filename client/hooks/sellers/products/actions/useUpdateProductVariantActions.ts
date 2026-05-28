import { updateVariantService } from "@/api";
import { STORAGE_KEY } from "@/constants/storage";
import useLoading from "@/hooks/common/useLoading";
import { ProductVariants, UpdateProductVariants } from "@/interfaces";
import { AppDispatch, ModalState, openModal } from "@/redux";

interface ActionProps {
  variants: ProductVariants;
  newVariants: UpdateProductVariants;
  dispatch: AppDispatch;
  checkingCorrectValues: (
    oldValues: ProductVariants,
    newValues: UpdateProductVariants
  ) => {
    ok: boolean;
    message?: string;
  };
  productId: string;
}

export default function useUpdateProductVariantActions({
  newVariants,
  variants,
  dispatch,
  checkingCorrectValues,
  productId,
}: ActionProps) {
  const { handleLoading } = useLoading({ dispatch });
  async function updateVariants() {
    const { ok, message } = checkingCorrectValues(variants, newVariants);
    if (!ok)
      return dispatch(
        openModal({ state: ModalState.ERROR, message: message! })
      );
    const res = await handleLoading(
      updateVariantService,
      productId,
      newVariants
    );
    if (!res.success) {
      return dispatch(
        openModal({ message: res.message, state: ModalState.ERROR })
      );
    }

    sessionStorage.removeItem(STORAGE_KEY.PRODUCT_ID_CREATED);
    return dispatch(
      openModal({ message: res.message, state: ModalState.SUCCESS })
    );
  }

  return {
    updateVariants,
  };
}
