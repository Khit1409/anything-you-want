import { createProductService } from "@/api/product.api";

import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";

import useLoading from "@/hooks/common/useLoading";
import { redirect } from "next/navigation";
import { STORAGE_KEY } from "@/constants/storage";
import { AppDispatch } from "@/redux";
import {
  CreateProductClassifications,
  CreateProductImage,
  CreateProductInfo,
  CreateProductShipping,
} from "@/interfaces";

interface CreateProductPayload {
  images: CreateProductImage;
  info: CreateProductInfo;
  classifications: CreateProductClassifications;
  shipping: CreateProductShipping;
}

export default function useCreateProductActions({
  dispatch,
}: {
  dispatch: AppDispatch;
}) {
  const { handleLoading } = useLoading({ dispatch });
  /**
   * Sử lý post data tạo mới sản phẩm.
   */

  async function createProduct({
    classifications,
    images,
    info,
    shipping,
  }: CreateProductPayload) {
    const formatImage = {
      thumbnail: images.thumbnail!,
      details: images.details!,
    };

    const dataForm = {
      info,
      classifications,
      images: formatImage,
      shipping,
    };

    const result = await handleLoading(createProductService, dataForm);
    const { message, success, data } = result;
    if (success && data) {
      console.log("create product return", data);
      sessionStorage.setItem(STORAGE_KEY.PRODUCT_ID_CREATED, data.id);
      redirect(`/seller/products/create/variants/${data.id}`);
    } else {
      dispatch(
        openModal({
          message,
          state: ModalState.ERROR,
        })
      );
    }
  }

  return {
    createProduct,
  };
}
