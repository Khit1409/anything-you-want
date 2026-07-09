import useAppModal from "@/features/common/hooks/useAppModal";
import useLoading from "@/features/common/hooks/useLoading";
import {
  CreateProductInfo,
  CreateProductRequest,
} from "@/features/product/interfaces/create.interface";
import { ShippingMethod } from "@/features/product/interfaces/read.interface";
import { useRouter } from "next/navigation";
import { createProductService } from "../../../services/seller.service";

export default function useCreateProductHandle() {
  const { handleLoading } = useLoading();
  const appModal = useAppModal();
  const router = useRouter();
  const checkBeforeSubmit = (value: CreateProductRequest) => {
    const { classifications, images, info, shipping } = value;
    const isClassificationFalse =
      classifications.length == 0 ||
      classifications.find((f) => f.values.length == 0)
        ? true
        : false ||
            classifications.find((f) => f.name === "" || f.name === undefined)
          ? true
          : false;
    const isImageFalse = images.thumbnail === "" || images.details.length == 0;
    const isInfoFalse = Object.keys(info).find(
      (key) => info[key as keyof CreateProductInfo] === "",
    )
      ? true
      : false || info.price <= 0 || info.sale > 100 || info.sale < 0;
    const isShippingFalse = shipping.methods.find((f) => {
      const { enabled, supportedProvinces, type, times } = f;
      const { deliveryDays, prepareDays } = times;
      if (
        (type === ShippingMethod.SAMEDAY || type === ShippingMethod.PICKUP) &&
        enabled
      ) {
        if (supportedProvinces.length == 0) {
          console.log("support is zero");
          return true;
        }
      }
      if (enabled && (deliveryDays == 0 || prepareDays == 0)) {
        console.log("is day zero");
        return true;
      }
    });
    if (isInfoFalse)
      return "Vui lòng kiểm tra lại các thông tin cơ bản của sản phẩm!";

    if (isImageFalse) return "Vui lòng kiểm tra lại phần tạo ảnh sản phẩm!";

    if (isShippingFalse) {
      console.log(isShippingFalse);
      return "Vui lòng kiểm tra lại cấu hình phương thức giao hàng!";
    }

    if (isClassificationFalse)
      return "Vui lòng kiểm tra lại các phân loại và giá trị phân loại!";
  };

  async function submitCreate(req: CreateProductRequest) {
    const isValueFalse = checkBeforeSubmit(req);
    if (isValueFalse) {
      return appModal.open({ message: isValueFalse });
    }
    const res = await handleLoading(createProductService, req);
    const { message, success, data } = res;
    if (success) {
      router.replace(`/seller/products/${data.id}`);
    }

    return appModal.open({ message, success });
  }

  return { submitCreate, handleLoading };
}
