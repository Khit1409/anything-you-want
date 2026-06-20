import { FormActions } from "../../components";

export default function EditActionSection() {
  return (
    <FormActions
      submitLabel="Cập nhật sản phẩm"
      actionLabel="Thay đổi trạng thái"
      deleteLabel="Xóa sản phẩm"
      deleteAction={() => {
        console.log("delete");
      }}
      onAction={() => {
        console.log("change status");
      }}
    />
  );
}
