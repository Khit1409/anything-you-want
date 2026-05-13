import {
  deleteCartService,
  getUserCartService,
  updateCartService,
} from "@/api/cart.api";
import { CartClassificationRequest } from "@/interfaces/cart.interface";
import { openModal, startLoadingAnimation } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";

import { useQuery } from "@tanstack/react-query";
import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

export default function useCartList() {
  const dispatch = useDispatch<AppDispatch>();
  const [reRender, setRerender] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["carts", reRender],
    queryFn: () => {
      return getUserCartService();
    },
  });

  const carts = data ?? [];
  const [idToUpdate, setIdToUpdate] = useState<string>();

  const [classificationSelected, setClassificationSelected] = useState<
    CartClassificationRequest[]
  >([]);

  const [newQuantity, setNewQuantity] = useState<number | undefined>();

  const updateCartServiceHandle = async () => {
    if (classificationSelected.length == 0 && newQuantity == undefined) {
      dispatch(
        openModal({
          message: "Không có gì thay đổi để cập nhật!",
          state: ModalState.WARNING,
        })
      );
      return;
    }
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
      classification: classificationSelected,
    };
    dispatch(startLoadingAnimation());
    const result = await updateCartService({ id: idToUpdate, ...dataToUpdate });
    if (result) {
      dispatch(startLoadingAnimation());
      const message = result.message;
      const modalType = result.success ? ModalState.SUCCESS : ModalState.ERROR;
      dispatch(openModal({ message, state: modalType }));
    }
    setRerender(true);
  };

  const onchangeClassificationSelected = (
    e: ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const dataset = e.target.dataset;
    const id = dataset.id_update;

    if (!id) {
      console.log("can't get id cart in dataset!");
      return;
    }

    setIdToUpdate(id);

    const cartNeed = carts.find((cart) => cart.id === id);
    if (!cartNeed) {
      console.log("cart not found!");
      return;
    }

    const classifiNeed = cartNeed.classification.find((f) => f.name === name);

    if (!classifiNeed) {
      console.log("not found classification need!");
      return;
    }

    const classifiValueNeed = classifiNeed.values.find(
      (fvl) => fvl.name === value
    );

    if (!classifiValueNeed) {
      console.log("Not found classification value need!");
      return;
    }

    const { extraPrice, stock, img } = classifiValueNeed;

    setClassificationSelected((prev) => {
      const existing = prev.find((f) => f.name === name);
      if (!existing) {
        return [
          ...prev,
          {
            name,
            values: { extraPrice, stock, img, name: classifiValueNeed.name },
          },
        ];
      }

      return prev.map((cls) =>
        cls.name === name
          ? {
              name,
              values: { extraPrice, stock, img, name: classifiValueNeed.name },
            }
          : cls
      );
    });
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
    setRerender(true);
  };

  return {
    carts,
    isLoading,
    error,
    setNewQuantity,
    onchangeClassificationSelected,
    classificationSelected,
    setIdToUpdate,
    updateCartServiceHandle,
    newQuantity,
    deleteCartServiceHandle,
  };
}
