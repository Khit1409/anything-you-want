import { deleteCartService, updateCartService } from "@/api";
import {
  AuthInitalState,
  IAppInitalState,
  ModalState,
  openModal,
  startLoadingAnimation,
} from "@/redux";
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";

interface ActionProps {
  dispatch: ThunkDispatch<
    {
      auth: AuthInitalState;
      app: IAppInitalState;
    },
    undefined,
    UnknownAction
  > &
    Dispatch<UnknownAction>;
  // optional refetch function from react-query to trigger data reload
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
    dispatch(startLoadingAnimation());
    const result = await updateCartService({ id: idToUpdate, ...dataToUpdate });
    if (result) {
      dispatch(startLoadingAnimation());
      const message = result.message;
      const modalType = result.success ? ModalState.SUCCESS : ModalState.ERROR;
      dispatch(openModal({ message, state: modalType }));
    }
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
