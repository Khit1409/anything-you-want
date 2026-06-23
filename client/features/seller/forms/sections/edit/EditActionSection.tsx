import { useEditProductConext } from "@/features/seller/contexts/EditProductContext";
import { FormActions } from "../../components";

export default function EditActionSection() {
  const { deleteHandle, id } = useEditProductConext();

  return (
    <FormActions
      submitLabel="Cập nhật sản phẩm"
      actionLabel="Thay đổi trạng thái"
      deleteLabel="Xóa sản phẩm"
      deleteAction={() => deleteHandle(id)}
      onAction={() => {
        console.log("change status");
      }}
    />
  );
}
