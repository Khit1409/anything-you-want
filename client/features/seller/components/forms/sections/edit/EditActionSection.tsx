import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { FormActions } from "../../components";

export default function EditActionSection() {
  const { deleteHandle, id, updateStatus, product } = useEditProductConext();

  return (
    product && (
      <FormActions
        submitLabel="Cập nhật sản phẩm"
        actionLabel="Thay đổi trạng thái"
        deleteLabel="Xóa sản phẩm"
        deleteAction={() => deleteHandle(id)}
        onAction={() =>
          updateStatus({ productId: id, currentStatus: product.status })
        }
      />
    )
  );
}
