import { EditProductRequest } from "@/features/product/interfaces/update.interface";
import {
  updateProductService,
  updateProductStatusService,
} from "../../../services/seller.service";
import useLoading from "@/features/common/hooks/useLoading";
import useAppModal from "@/features/common/hooks/useAppModal";
import { ProductStatus } from "@/features/product/interfaces/read.interface";
import { deleteProductService } from "@/features/product/services/product.service";

export default function useEditProductHandle() {
  const { handleLoading } = useLoading();

  const appModal = useAppModal();
  async function submitUpdate(req: EditProductRequest, id: string) {
    const res = await handleLoading(updateProductService, id, req);
    const { message, success } = res;
    return appModal.open({ message, success });
  }

  async function deleteHandle(id: string) {
    const res = await handleLoading(deleteProductService, id);
    const { message, success } = res;
    return appModal.open({ message, success });
  }

  async function updateStatus({
    currentStatus,
    productId,
  }: {
    currentStatus: ProductStatus;
    productId: string;
  }) {
    const productStatus = currentStatus;
    const statusPayload =
      productStatus === ProductStatus.ACTIVE
        ? ProductStatus.INACTIVE
        : ProductStatus.ACTIVE;
    console.log(productStatus, statusPayload);
    const res = await handleLoading(
      updateProductStatusService,
      productId,
      statusPayload,
    );
    const { message, success } = res;
    return appModal.open({ message, success });
  }
  return { submitUpdate, updateStatus, deleteHandle };
}
