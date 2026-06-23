import useLoading from "@/features/common/hooks/useLoading";
import { deleteProductService } from "../services/seller.service";
import useAppModal from "@/features/common/hooks/useAppModal";

export default function useDeleteProduct() {
  const { handleLoading } = useLoading();
  const { open } = useAppModal();
  async function deleteHandle(id: string) {
    const res = await handleLoading(deleteProductService, id);
    const { message, success } = res;
    return open({ message, success });
  }
  return { deleteHandle };
}
