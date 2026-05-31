import useProductClassificationHelpers from "./useProductClassificationHelpers";
import useProductImageHelpers from "./useProductImageHelpers";
import useProductInfoHelpers from "./useProductInfoHelpers";
import { AppDispatch, ModalState, openModal } from "@/redux";
import useProductShippingHelpers from "./useProductShippingHelpers";
import useProductPhysicalHelper from "./useProductPhysicalHelpers";

interface HelperProps {
  dispatch: AppDispatch;
}

export default function useCreateProductHelpers({ dispatch }: HelperProps) {
  const { validateClassification, classifications } =
    useProductClassificationHelpers({
      dispatch,
    });
  const { validateImages, images } = useProductImageHelpers({ dispatch });
  const { validateProductInfo, productInfo } = useProductInfoHelpers();
  const { shipping, checkingShipping } = useProductShippingHelpers();

  const validatePayload = () => {
    const checkInfo = validateProductInfo(productInfo);
    if (!checkInfo.ok) {
      return dispatch(
        openModal({ message: checkInfo.message, state: ModalState.WARNING })
      );
    }
    const checkImg = validateImages(images);
    if (!checkImg.ok) {
      return dispatch(
        openModal({ message: checkImg.message, state: ModalState.WARNING })
      );
    }
    const checkClassification = validateClassification(classifications);
    if (!checkClassification.ok) {
      return dispatch(
        openModal({
          message: checkClassification.message,
          state: ModalState.WARNING,
        })
      );
    }
    const checkShipping = checkingShipping(shipping);

    if (!checkShipping.ok) {
      return dispatch(
        openModal({ message: checkShipping.message, state: ModalState.WARNING })
      );
    }
  };

  return {
    validatePayload,
    ...useProductClassificationHelpers({ dispatch }),
    ...useProductInfoHelpers(),
    ...useProductImageHelpers({ dispatch }),
    ...useProductShippingHelpers(),
    ...useProductPhysicalHelper(),
  };
}
