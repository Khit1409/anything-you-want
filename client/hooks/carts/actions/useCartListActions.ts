import { deleteCartService, updateCartService } from "@/api";
import useLoading from "@/hooks/common/useLoading";
import {
  AppDispatch,
  ModalState,
  openModal,
  startLoadingAnimation,
} from "@/redux";

interface ActionProps {
  dispatch: AppDispatch;
  refetch?: () => Promise<unknown>;
  newVariant?: string;
  newQuantity: number | undefined;
  idToUpdate: string | undefined;
  setIdToUpdate: React.Dispatch<React.SetStateAction<string | undefined>>;
  setNewQuantity: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export default function useCartListActions({
  dispatch,
  newQuantity,
  refetch,
  newVariant,
  idToUpdate,
  setIdToUpdate,
  setNewQuantity,
}: ActionProps) {
  const { handleLoading } = useLoading({ dispatch });

  const updateCartServiceHandle = async () => {
    if (!idToUpdate) {
      console.log("id to update is undifine!");
      dispatch(
        openModal({
          message: "Có lỗi khi nhận dạng giỏ hàng cần chỉnh sửa, thử lại!",
          state: ModalState.WARNING,
        })
      );
      return;
    }
    const dataToUpdate = {
      quantity: newQuantity,
      variant: newVariant,
    };

    const result = await handleLoading(updateCartService, {
      id: idToUpdate,
      ...dataToUpdate,
    });

    const { message, success } = result;

    dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );

    if (refetch) {
      setIdToUpdate(undefined);
      setNewQuantity(undefined);
      await refetch();
    }
  };

  const deleteCartServiceHandle = async (id: string) => {
    dispatch(startLoadingAnimation());
    const result = await deleteCartService(id);
    if (result) {
      dispatch(startLoadingAnimation());
      const mess = result.message;
      const state = result.success ? ModalState.SUCCESS : ModalState.ERROR;
      dispatch(openModal({ message: mess, state }));
    }
    if (refetch) await refetch();
  };
  return {
    deleteCartServiceHandle,
    updateCartServiceHandle,
  };
}
