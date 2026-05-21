import { createProductService } from "@/api/product.api";

import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";

import { useDispatch } from "react-redux";
import useProductInfo from "../helpers/useProductInfo";
import useClassification from "../helpers/useClassification";
import useImages from "../helpers/useImages";
import useShipping from "../helpers/useShipping";
import useSellerCreateProductQueries from "../queries/useSellerCreateProductQueries";

export default function useCreateProduct() {
  const dispatch = useDispatch<AppDispatch>();

  const { categories } = useSellerCreateProductQueries();

  const productInfoHook = useProductInfo();
  const classificationHook = useClassification();
  const imagesHook = useImages();
  const shippingHook = useShipping();

  const { productInfo } = productInfoHook;
  const { classifications } = classificationHook;
  const { images } = imagesHook;
  const { shipping } = shippingHook;

  const validateProductInfo = productInfoHook.validateProductInfo;
  const validateClassification = classificationHook.validateClassification;
  const validateImages = imagesHook.validateImages;
  /**
   * Sử lý post data tạo mới sản phẩm.
   */

  async function createProduct() {
    const checkedImage = validateImages(images);

    if (!checkedImage.ok) {
      const { message } = checkedImage;
      return dispatch(openModal({ message, state: ModalState.WARNING }));
    }

    /**
     * Check thành công tức là thumbnail và details đã được chọn.
     */
    const formatImage = {
      thumbnail: images.thumbnail!,
      details: images.details!,
    };

    const dataForm = {
      info: productInfo,
      classification: classifications,
      images: formatImage,
      shipping,
    };

    const checkedInfo = validateProductInfo(dataForm.info);
    if (!checkedInfo.ok) {
      const { message } = checkedInfo;
      return dispatch(openModal({ message, state: ModalState.WARNING }));
    }
    const checkedClassification = validateClassification(
      dataForm.classification
    );
    if (!checkedClassification.ok) {
      const { message } = checkedClassification;
      return dispatch(openModal({ message, state: ModalState.WARNING }));
    }
    if (!shipping.normal) {
      return dispatch(
        openModal({
          message: "Không được tắt vận chuyển thường!",
          state: ModalState.WARNING,
        })
      );
    }
    const result = await createProductService(dataForm);
    const { message, success } = result;
    return dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  }

  return {
    categories,
    createProduct,
    ...productInfoHook,
    ...classificationHook,
    ...imagesHook,
    ...shippingHook,
  };
}
